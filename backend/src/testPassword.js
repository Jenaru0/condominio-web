const bcrypt = require('bcrypt');

const storedPassword = '$2b$10$R/yysVE4mZPmZuqbS4/j8eM2pI4/E.rMjru5SCa4PSfZFrx7V0ttW'; // Contraseña encriptada
const inputPassword = 'prueba5@ejemplo.com'; // Contraseña ingresada por el usuario

bcrypt.compare(inputPassword, storedPassword, (err, isMatch) => {
    if (err) {
        console.error('Error al comparar contraseñas:', err);
    } else if (isMatch) {
        console.log('¡Contraseña válida!');
    } else {
        console.log('Contraseña inválida.');
    }
});
