function verifyUserAssociate(req, res, next) {
    const tipo = req.headers["tipo"];
    if (!tipo) return res.status(401).json({ msg: "Tipo de usuario indefinido." });
      if (tipo == "Associado")
      next();
      else return res.status(401).json({ msg: "Falha na verificação do tipo de usuário." });
  }
  
module.exports = verifyUserAssociate;