const express = require('express');
const routes = express.Router();

// MÉTODO GET
routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM compras', (err, rows) => {
            if (err) return res.send(err);

            res.json(rows);
        });
    });
});

// MÉTODO POST
routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        // Calcula el total como price * amount
        const { price, amount } = req.body;
        const total = price * amount;

        // Incluye el total en el cuerpo del objeto a insertar
        const newCompra = { ...req.body, total };

        // Inserta la compra con el total calculado
        conn.query('INSERT INTO compras set ?', [newCompra], (err, rows) => {
            if (err) return res.send(err);

            res.send('La compra ha sido registrada');
        });
    });
});

// MÉTODO UPDATE
routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        // Calcula el total como price * amount
        const { price, amount } = req.body;
        const total = price * amount;

        // Incluye el total en el cuerpo del objeto a actualizar
        const updatedCompra = { ...req.body, total };

        // Actualiza la compra con el total recalculado
        conn.query('UPDATE compras set ? WHERE idcompras = ?', [updatedCompra, req.params.id], (err, rows) => {
            if (err) return res.send(err);

            res.send('La compra ha sido actualizada');
        });
    });
});

// MÉTODO DELETE
routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('DELETE FROM compras WHERE idcompras = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err);

            res.send('La compra ha sido eliminada');
        });
    });
});

module.exports = routes;
