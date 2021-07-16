const Associate = require("../models/Associate.js");
const Sequelize = require("sequelize");
const Deliveries = require("../models/Delivery.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id) {
  process.env.ASSOCIATE_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id }, process.env.ASSOCIATE_SECRET, {
    expiresIn: 18000, // Token expira em 5 horas
  });
  return token;
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
};
