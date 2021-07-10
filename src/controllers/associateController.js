const Associate = require("../models/Associate.js");
const Sequelize = require("sequelize");
const Deliveries = require("../models/Delivery.js");
module.exports = {
  //**Novo associado */
  async newAssociate(req, res) {
    try {
      const { companyName, cnpj, address, password } = req.body;
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
          companyName,
          cnpj,
          address,
          password: hash,
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
      order: [["companyName", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão." });
    });
    if (sellers) res.status(200).json({ associates });
    else
      res.status(404).json({ msg: "Nao foi possível encontrar Associados." });
  },
  async searchAssociateByCnpj(req, res) {
    const cnpj = req.body.cnjp;
    const associate = Associate.findOne({
      where: { cnpj },
    });
    if (associate) {
      if (associate == "")
        res.status(404).json({ msg: "Associado não encontrado" });
      else res.status(200).json({ associate });
    } else res.status(404).json({ msg: "Associado não encontrado." });
  },
  async updateAssociate(req, res) {
    try {
      const { id, companyName, cnpj, address, password } = req.body;
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
          await Associate.update(companyName, cnpj, address, password, {
            where: { id },
          });
          res.status(200).json({ msg: "Dados do associado atualizados." });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteAssociate(req, res) {
    const AssociateId = req.params.id;
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
