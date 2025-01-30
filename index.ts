type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
  id: number;
  monto: number;
  descripcion: string;
  tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];
let balance: number = 0;

function agregarTransaccion(tipo: TipoTransaccion): void {
    const montoInput = <HTMLInputElement>document.getElementById("monto");
    const descripcionInput = <HTMLInputElement>document.getElementById("descripcion");

    const monto: number = parseFloat(montoInput.value);
    const descripcion: string = descripcionInput.value.trim();

    if (!descripcion || isNaN(monto) || monto <= 0) {
        alert("Ingrese valores validos");
        return;
    }
 
    if (tipo === "gasto" && monto > balance) {
        alert("No puede realizar un gasto mayor al balance disponible");
        return;
    }

    const transaccion: Transaccion = {
        id: Date.now(),
        monto: monto,
        descripcion: descripcion,
        tipo: tipo,
    };

    transacciones.push(transaccion);

    balance += tipo === "ingreso" ? monto : -monto;

    actualizarUI();

    montoInput.value = "";
    descripcionInput.value = "";
}

function actualizarUI(): void {

    const balanceElement = <HTMLSpanElement>document.getElementById("balance");
    balanceElement.textContent = balance.toFixed(2);

    const listaTransacciones = <HTMLUListElement>document.getElementById("lista-transacciones");
    listaTransacciones.innerHTML = "";

    transacciones.forEach((t) => {
        const li = document.createElement("li");
        li.className = `p-2 border mb-2 ${t.tipo === "ingreso" ? "bg-green-100" : "bg-red-100"}`;
        li.innerHTML = `<span class="font-bold">$${t.monto.toFixed(2)}</span> - ${t.descripcion} (${t.tipo})`;
        listaTransacciones.appendChild(li);
    });

    const tablaTransacciones = <HTMLTableElement>document.getElementById("tabla-transacciones");
    const tbody = tablaTransacciones.querySelector("tbody");

    if (tbody) {
        tbody.innerHTML = ""; 

        transacciones.forEach((t) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="border p-2">$${t.monto.toFixed(2)}</td>
                <td class="border p-2">${t.descripcion}</td>
                <td class="border p-2">${t.tipo}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}
