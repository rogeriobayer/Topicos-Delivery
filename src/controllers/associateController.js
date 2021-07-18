const Associate = require("../models/Associate");
const Customer = require("../models/Customer");
const Motoboy = require("../models/Motoboy");
const Delivery = require("../models/Delivery");

const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id) {
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 18000, // Token expira em 5 horas
  });
  return token;
}
function passwordValidation(password) {
  if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
  else if (!password.match(/[a-zA-Z]/g))
    return "Senha deve ter no mínimo uma letra.";
  else if (!password.match(/[0-9]+/))
    return "Senha deve ter no mínimo um número.";
  else if (!password.match(/[*!@#$%^&()_+-=[]{};':"\|,.<>?]/))
    return "Senha deve ter no mínimo um caracter especial.";
  else return "OK";
}
function cnpjValidation(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, ""); //Tira possíveis mascaras do front

  if (cnpj == "") return "cnpj vazio";

  if (cnpj.length != 14) return "cnpj não está completo";

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return "cnpj inválido";

  // Valida os digitos verificadores
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return "cnpj inválido";

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return "cnpj inválido";

  return "OK";
}
async function getRankOfCustomers(arr) {
  let itemPicked,
    list = [];

  let arrayOfKey = arr.map(function (item) {
    return item["customerId"];
  });

  for (const item of arrayOfKey
    .sort()
    .filter((el, i, a) => i === a.indexOf(el))) {
    itemPicked = await Customer.findAll({
      attributes: ["id", "companyname"],
      raw: true,
      where: {
        id: item,
      },
    }).catch((error) => {
      return res.status(500).json({ msg: "Erro interno do servidor" + error });
    });

    list.push(itemPicked[0]);
  }
  return list.slice(0, 4);
}

async function getRankOfMotoboys(arr) {
  let itemPicked,
    list = [];

  let arrayOfKey = arr.map(function (item) {
    return item["motoboyId"];
  });

  for (const item of arrayOfKey
    .sort()
    .filter((el, i, a) => i === a.indexOf(el))) {
    itemPicked = await Motoboy.findAll({
      attributes: ["id", "name"],
      raw: true,
      where: {
        id: item,
      },
    }).catch((error) => {
      return res.status(500).json({ msg: "Erro interno do servidor" + error });
    });

    list.push(itemPicked[0]);
  }
  return list.slice(0, 4);
}

async function getPercentageOfDelivered(arr) {
  let arrayOfKey = arr.filter((item) => item.status === "Entregue").length;
  return ((100 / Object.keys(arr).length) * arrayOfKey).toFixed(2) + "%";
}

async function getPercentageOfOpen(arr) {
  let arrayOfKey = arr.filter((item) => item.status === "Em Aberto").length;
  return ((100 / Object.keys(arr).length) * arrayOfKey).toFixed(2) + "%";
}

module.exports = {
  async authentication(req, res) {
    const cnpj = req.body.cnpj;
    const password = req.body.password;
    if (!cnpj || !password)
      return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
    try {
      const associate = await Associate.findOne({
        where: { cnpj },
      });
      if (!associate)
        return res.status(404).json({ msg: "Usuário ou senha inválidos." });
      else {
        if (bcrypt.compareSync(password, associate.password)) {
          const token = generateToken(associate.id);
          return res
            .status(200)
            .json({ msg: "Autenticado com sucesso", token });
        } else
          return res.status(404).json({ msg: "Usuário ou senha inválidos." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //**Novo associado */
  async newAssociate(req, res) {
    try {
      const { companyname, cnpj, address, password } = req.body;
      if (!companyname || !cnpj || !address || !password) {
        res.status(400).json({
          msg: "Dados obrigatórios não foram preenchidos.",
        });
      }
      const cnpjValid = cnpjValidation(cnpj);
      if (cnpjValid !== "OK") {
        return res.status(400).json({ msg: cnpjValid });
      }
      const passwordValid = passwordValidation(password);
      if (passwordValid !== "OK")
        return res.status(400).json({
          msg: passwordValid,
        });
      const isAssociateNew = await Associate.findOne({
        where: { cnpj },
      });
      if (isAssociateNew) {
        res.status(403).json({ msg: "Associado já foi cadastrado" });
      } else {
        // calcular hash da password
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        const associate = await Associate.create({
          companyname,
          cnpj,
          address,
          password: hash,
        }).catch((error) => {
          res.status(500).json({ msg: "Não foi possível inserir os dados." });
        });
        if (associate)
          res.status(201).json({ msg: "Novo associado foi adicionado." });
        else
          res
            .status(404)
            .json({ msg: "Não foi possível cadastrar novo associado." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Não foi possível inserir os dados." });
    }
  },
  //** Listagem de Associados */
  async listAllAssociates(req, res) {
    const associates = await Associate.findAll({
      order: [["companyname", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão." });
    });
    if (associates) res.status(200).json({ associates });
    else
      res.status(404).json({ msg: "Nao foi possível encontrar Associados." });
  },
  //** Buscar associado pelo cnpj */
  async searchAssociateByCnpj(req, res) {
    const cnpj = req.body.cnpj;
    const cnpjValid = cnpjValidation(cnpj);
    if (cnpjValid !== "OK") {
      return res.status(400).json({ msg: cnpjValid });
    }
    const associate = await Associate.findOne({
      where: { cnpj },
    });
    if (associate) {
      res.status(200).json({ associate });
    } else res.status(404).json({ msg: "Associado não encontrado." });
  },
  //** Atualizar associado */
  async updateAssociate(req, res) {
    try {
      const { id, companyname, cnpj, address, password } = req.body;
      if (!companyname || !cnpj || !address || !password) {
        res.status(400).json({
          msg: "Dados obrigatórios não foram preenchidos.",
        });
      }
      const cnpjValid = cnpjValidation(cnpj);
      if (cnpjValid !== "OK") {
        return res.status(400).json({ msg: cnpjValid });
      }
      const passwordValid = passwordValidation(password);
      if (passwordValid !== "OK")
        return res.status(400).json({
          msg: passwordValid,
        });
      const associateExists = await Associate.findByPk(id);
      if (associateExists) {
        const associateCnpjExists = await Associate.findOne({
          where: { cnpj },
        });
        if (associateCnpjExists) {
          if (associateCnpjExists.id != associateExists.id) {
            res.status(401).json({ msg: "CNPJ já cadastrado." });
          }
        } else {
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);
          await Associate.update(companyname, cnpj, address, hash, {
            where: { id },
          });
          res.status(200).json({ msg: "Dados do associado atualizados." });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //** Deletar Associado */
  async deleteAssociate(req, res) {
    const AssociateId = req.body.id;
    const deletedAssociate = await Associate.destroy({
      where: { id: AssociateId },
    }).catch(async (error) => {
      const AssociateHasRef = await Deliveries.findOne({
        where: { AssociateId },
      }).catch((error) => {
        res.status(500).json({ msg: "Falha na conexão." });
      });
      if (AssociateHasRef) {
        // ** Pprecisamos deletar os outros registros aqui.
      }
    });
    if (deletedAssociate != 0)
      res.status(200).json({ msg: "Associado excluido com sucesso." });
    else res.status(404).json({ msg: "Associado não encontrado." });
  },

  async getAdministrativeReport(req, res) {
    let customers, motoboys, deliveries;
    try {
      customers = await Customer.count();
      motoboys = await Motoboy.count();
      deliveries = await Delivery.findAll();
    } catch {
      res.status(500).json({ msg: "Falha na conexão com o banco de dados." });
    }

    if (customers && motoboys && deliveries)
      res.status(200).json({
        "Clientes cadastrados": customers,
        "Motoboys cadastrados": motoboys,
        "Deliveries cadastrados": Object.keys(deliveries).length,
        "Clientes que mais fizeram pedidos": await getRankOfCustomers(
          deliveries
        ),
        "Motoboys que mais fizeram entregas": await getRankOfMotoboys(
          deliveries
        ),
        "Porcentagem de entregas Realizadas": await getPercentageOfDelivered(
          deliveries
        ),
        "Porcentagem de entregas Em Aberto": await getPercentageOfOpen(
          deliveries
        ),
      });
    else
      res.status(404).json({ msg: "Nao foi possível encontrar Associados." });
  },

  async getFinancialReport(req, res) {
    let deliveries;
    try {
      deliveries = await Delivery.findAll();
    } catch {
      res.status(500).json({ msg: "Falha na conexão com o banco de dados." });
    }

    let totalDeliveries = 0;
    for (const item of deliveries) {
      totalDeliveries += Number.parseInt(item.price);
    }

    if (deliveries)
      res.status(200).json({
        "Valor total das entregas": "R$" + totalDeliveries.toFixed(2),
        "Valor destinado para os motoboys":
          "R$ " + (totalDeliveries.toFixed(2) / 100) * 70,
        "Valor destinado para o associado":
          "R$ " + (totalDeliveries.toFixed(2) / 100) * 30,
      });
    else
      res.status(404).json({ msg: "Nao foi possível encontrar Associados." });
  },
  logout(req, res) {
		process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
		res.sendStatus(200);
	},
};
