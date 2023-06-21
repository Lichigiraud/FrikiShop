import { useState } from "react";

const CheckoutForm = ({ onConfirm }) => {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {
            nombre,
            telefono,
            email,
        };
        onConfirm(userData);
    };

    return (
        <div className="Container">
            <form onSubmit={handleConfirm} className="Form">
                <label className="Label">
                    Nombre
                    <input
                        className="Input"
                        type="text"
                        value={nombre}
                        onChange={({ target }) => setNombre(target.value)}
                    />
                </label>
                <label className="Label">
                    Telefono
                    <input
                        className="Input"
                        type="text"
                        value={telefono}
                        onChange={({ target }) => setTelefono(target.value)}
                    />
                </label>
                <label className="Label">
                    Email
                    <input
                        className="Input"
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </label>
                <button type="submit">Confirmar</button>
            </form>
        </div>
    );
};

export default CheckoutForm;

// import { useState } from "react";


// const CheckoutForm = ({ onConfirm }) => {
//     const [nombre, setNombre] = useState("");
//     const [telefono, setTelefono] = useState("");
//     const [email, setEmail] = useState("");

//     const handleConfirm = (event) => {
//     event.preventDefault();

//     const userData = {
//         nombre,
//         telefono,
//         email,
//     };
//     onConfirm(userData);
// };

// return (
//     <div className="Container">
//         <form onSubmit={handleConfirm} className="Form">
//         <label className="Label">
//             Nombre
//             <input
//             className="Input"
//             type="text"
//             value={nombre}
//             onChange={({ target }) => setNombre(target.value)}
//         />
//         </label>
//         <label className="Label">
//             Telefono
//             <input
//             className="Input"
//             type="text"
//             value={telefono}
//             onChange={({ target }) => setTelefono(target.value)}
//         />
//         </label>
//         <label className="Label">
//             Email
//             <input
//             className="Input"
//             type="email"
//             value={email}
//             onChange={({ target }) => setEmail(target.value)}
//         />
//         </label>
//         <button type="submit">Confirmar</button>
//         </form>
//     </div>
// );
// };

// export default CheckoutForm;
