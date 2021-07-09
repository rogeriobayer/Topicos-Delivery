const Customer = require("../models/Customer");
const Sequelize = require("sequelize");

module.exports = {
  async listAllCustomers(req, res) {
    const customers = await Customer.findAll({
      customers: [["id", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão." });
    });
    if (customers)
      if (customers == "")
        res.status(404).json({ msg: "Não foi possível encontrar clientes." });
      else res.status(200).json({ customers });
    else res.status(404).json({ msg: "Não foi possível encontrar clientes." });
  },

  async searchCustomerByName(req, res) {
    const companyname = req.body.companyname;
    if (!companyname)
      res.status(400).json({
        msg: "Parâmetro id está vazio.",
      });
    const Op = Sequelize.Op;
    const customer = await Customer.findAll({
      where: { companyname: { [Op.like]: "%" + companyname + "%" } },
    });
    if (customer) {
      if (customer == "")
        res.status(404).json({ msg: "Cliente não encontrado" });
      else res.status(200).json({ customer });
    } else
      res.status(404).json({
        msg: "Cliente não encontrado.",
      });
  },

  async searchCustomerByCNPJ(req, res) {
    const cnpj = req.body.cnpj;
    if (!cnpj)
      res.status(400).json({
        msg: "Parâmetro cnpj está vazio.",
      });
    const Op = Sequelize.Op;
    const customer = await Customer.findAll({
      where: { cnpj: { [Op.like]: "%" + cnpj + "%" } },
    });
    if (customer) {
      if (customer == "")
        res
          .status(404)
          .json({ msg: "Cliente com cnpj " + cnpj + " não encontrado" });
      else res.status(200).json({ customer });
    } else
      res.status(404).json({
        msg: "Cliente não encontrado.",
      });
  },

  async searchCustomerById(req, res) {
    const id = req.body.id;
    if (!id)
      res.status(400).json({
        msg: "Parâmetro nome está vazio.",
      });
    const Op = Sequelize.Op;
    const customer = await Customer.findAll({
      where: { id: { [Op.like]: "%" + id + "%" } },
    });
    if (customer) {
      if (customer == "")
        res
          .status(404)
          .json({ msg: "Cliente com id " + id + " não encontrado" });
      else res.status(200).json({ customer });
    } else
      res.status(404).json({
        msg: "Cliente não encontrado.",
      });
  },

  async newCustomer(req, res) {
    const { companyname, address, cnpj, associateId } = req.body;
    if (!companyname || !address || !cnpj || !associateId) {
      res.status(400).json({
        msg: "Dados obrigatórios não foram preenchidos.",
      });
    }
    const isCustomerNew = await Customer.findOne({
      //Validação se existe
      where: { cnpj },
    });

    if (isCustomerNew)
      res.status(403).json({ msg: "Cliente já foi cadastrado." });
    else {
      const customer = await Customer.create({
        companyname,
        address,
        cnpj,
        associateId,
      }).catch((error) => {
        res.status(500).json({ msg: "Não foi possível inserir os dados." });
      });
      if (customer)
        res.status(201).json({ msg: "Novo cliente foi adicionado." });
      else
        res
          .status(404)
          .json({ msg: "Não foi possível cadastrar novo cliente." });
    }
  },

  async deleteCustomer(req, res) {
    const id = req.params.id;
    const deletedCustomer = await Customer.destroy({
      where: { id: id },
    }).catch(async (error) => {
      return res.status(403).json({ msg: error });
    });
    if (deletedCustomer != 0)
      res.status(200).json({ msg: "Cliente excluido com sucesso." });
    else res.status(404).json({ msg: "Cliente não encontrado." });
  },

  async updateCustomer(req, res) {
    const customerId = req.body.id;
    const customer = req.body;
    if (!customerId) res.status(400).json({ msg: "ID do cliente vazio." });
    else {
      const customerExists = await Customer.findByPk(customerId);
      if (!customerExists)
        res.status(404).json({ msg: "Cliente não encontrado." });
      else {
        if (customer.name || customer.address) {
          await Customer.update(customer, {
            where: { id: customerId },
          });
          return res
            .status(200)
            .json({ msg: "Cliente atualizado com sucesso." });
        } else
          return res
            .status(400)
            .json({ msg: "Campos obrigatórios não preenchidos." });
      }
    }
  },
};
