const Delivery = require("../models/Delivery");
const Associate = require("../models/Associate");
const Motoboy = require("../models/Motoboy");
const Customer = require("../models/Customer");
const Sequelize = require("sequelize");

module.exports = {
    async newDelivery(req, res) {
        const {
            associateId,
            motoboyId,
            customerId,
            status,
            price,
            description
        } = req.body;
        if (!customerId || !motoboyId || !description || !status || !associateId || !price) {
            res.status(400).json({
                msg: "Dados obrigatórios não foram preenchidos.",
            });
        }
        const isAssociateExist = await Associate.findOne({
            where: {
                id: associateId
            },
        });

        const isCustomerExist = await Customer.findOne({
            where: {
                id: customerId
            },
        });

        const isMotoboyExist = await Motoboy.findOne({
            where: {
                id: motoboyId
            },
        });

        if (!isMotoboyExist || !isCustomerExist || !isAssociateExist)
            res.status(403).json({
                msg: "Motoboy,Cliente ou Associado não é cadastrado."
            });
        else {
            const delivery = await Delivery.create({
                customerId,
                motoboyId,
                associateId,
                description,
                status,
                price
            }).catch((error) => {
                res.status(500).json({
                    msg: "Não foi possível inserir os dados."
                });
            });
            if (delivery)
                res.status(201).json({
                    msg: "Novo pedido foi adicionado."
                });
            else
                res
                .status(404)
                .json({
                    msg: "Não foi possível cadastrar novo pedido."
                });
        }
    },

    async listAllDeliveries(req, res) {
        const deliveries = await Delivery.findAll({
            deliveries: [
                ["id", "ASC"]
            ]
        }).catch((error) => {
            res.status(500).json({
                msg: "Falha na conexão."
            });
        });
        if (deliveries)
            if (deliveries == "")
                res.status(404).json({
                    msg: "Não foi possível encontrar pedidos."
                });
            else res.status(200).json({
                deliveries
            });
        else res.status(404).json({
            msg: "Não foi possível encontrar pedidos."
        });
    },

    async searchDeliveriesByStatus(req, res) {
        const status = req.body.status;
        if (!status)
            res.status(400).json({
                msg: "Parâmetro status está vazio.",
            });
        const Op = Sequelize.Op;
        const delivery = await Delivery.findAll({
            where: {
                status: {
                    [Op.like]: "%" + status + "%"
                }
            },
        });
        if (delivery) {
            if (delivery == "")
                res
                .status(404)
                .json({
                    msg: "Entregas com status " + status + " não encontrado"
                });
            else res.status(200).json({
                delivery
            });
        } else
            res.status(404).json({
                msg: "Entregas não encontradas.",
            });
    },

    async searchDeliveriesByMotoboy(req, res) {
        const motoboy = req.body.motoboyId;
        if (!motoboy)
            res.status(400).json({
                msg: "Parâmetro motoboyID está vazio.",
            });
        const Op = Sequelize.Op;
        const delivery = await Delivery.findAll({
            where: {
                motoboyId: {
                    [Op.like]: "%" + motoboy + "%"
                }
            },
        });
        if (delivery) {
            if (delivery == "")
                res
                .status(404)
                .json({
                    msg: "Entregas do motoboy com ID " + motoboy + " não encontrado"
                });
            else res.status(200).json({
                delivery
            });
        } else
            res.status(404).json({
                msg: "Entregas não encontradas.",
            });
    }
}