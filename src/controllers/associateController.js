const Associate = require("../models/Associate");
const Customer = require("../models/Customer");
const Motoboy = require("../models/Motoboy");
const Delivery = require("../models/Delivery");

const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

function generateToken(id) {
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 18000, // Token expira em 5 horas
  });
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
      //** Caso o endereço seja undefined, no midaware precisa => 'address = "";'  */
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
          res
            .status(500)
            .json({ msg: "Não foi possível aasdaksodakod inserir os dados." });
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
};
