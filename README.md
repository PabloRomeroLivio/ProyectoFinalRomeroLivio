# Cookie E-Commerce
Este es un proyecto de un e-commerce para comprar galletitas. 


## Tecnologías utilizadas
- React
- Firebase
- React Router
- Bootstrap
- etc.


## Instalación
1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/cookie-ecommerce.git

npm install
npm start


## Uso
1. Agrega productos al carrito.
2. Ve a la página de detalles de los productos para más información.
3. Realiza tu compra en el checkout.


## Estructura del Proyecto

src/: Contiene todos los archivos fuente de React.
src/components/: Todos los componentes de React y Contiene el contexto para el carrito de compras.
src/firebase-config/: Configuración y funciones para interactuar con Firebase.


## Desarrollo Componentes

Cart.jsx - Muestra los productos en el carrito y permite gestionar su cantidad.
CartContext.jsx - Contexto global que maneja el estado del carrito.
CartWidget.jsx - Ícono del carrito que muestra la cantidad de productos agregados.
CheckoutForm.jsx - Formulario para finalizar la compra y registrar los datos del cliente.
Item.jsx - Tarjeta individual que muestra la información básica de un producto.
ItemCount.jsx - Controlador de cantidad para agregar productos al carrito.
ItemDetail.jsx - Muestra todos los detalles de un producto específico.
ItemDetailContainer.jsx - Obtiene y gestiona los datos de un producto antes de mostrarlos en ItemDetail.
ItemList.jsx - Lista de productos generada a partir de los datos obtenidos.
ItemListContainer.jsx - Obtiene los productos y los pasa a ItemList.
Navbar.jsx - Barra de navegación con enlaces a distintas secciones.
ProductContext.jsx - Contexto global que maneja los productos del catálogo.
uploadProducts.js - Script para cargar productos a Firebase automáticamente.