import { useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [categoria, setCategoria] = useState("general");
  const [editando, setEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  // Agregar nuevo producto
  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      const nuevoItem = {
        id: Date.now(),
        nombre: nuevoProducto,
        categoria,
        comprado: false,
      };
      setProductos([...productos, nuevoItem]);
      setNuevoProducto("");
    }
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  // Marcar como comprado/no comprado
  const toggleComprado = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, comprado: !producto.comprado }
          : producto
      )
    );
  };

  // Editar producto
  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setTextoEditado(producto.nombre);
  };

  const guardarEdicion = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id ? { ...producto, nombre: textoEditado } : producto
      )
    );
    setEditando(null);
  };

  const cancelarEdicion = () => {
    setEditando(null);
  };

  // Filtrar productos por categoría
  const productosPorCategoria = (cat) => {
    return productos.filter((producto) => producto.categoria === cat);
  };

  // Obtener categorías únicas
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Lista de Compras Avanzada</h1>

      {/* Formulario para agregar productos */}
      <div style={styles.formulario}>
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          style={styles.input}
          placeholder="Escribe un producto..."
          onKeyPress={(e) => e.key === "Enter" && agregarProducto()}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={styles.select}
        >
          <option value="general">General</option>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="lacteos">Lácteos</option>
          <option value="carnes">Carnes</option>
        </select>

        <button onClick={agregarProducto} style={styles.botonAgregar}>
          Agregar
        </button>
      </div>

      {/* Lista de productos organizada por categorías */}
      {categorias.length > 0 ? (
        <div style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <div key={cat} style={styles.categoria}>
              <h2 style={styles.subtitulo}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h2>
              <ul style={styles.lista}>
                {productosPorCategoria(cat).map((producto) => (
                  <li
                    key={producto.id}
                    style={{
                      ...styles.item,
                      textDecoration: producto.comprado ? "line-through" : "none",
                      opacity: producto.comprado ? 0.7 : 1,
                    }}
                  >
                    {editando === producto.id ? (
                      <input
                        type="text"
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                        style={styles.inputEdicion}
                      />
                    ) : (
                      <span>{producto.nombre}</span>
                    )}

                    <div style={styles.botones}>
                      {editando === producto.id ? (
                        <>
                          <button
                            onClick={() => guardarEdicion(producto.id)}
                            style={styles.botonGuardar}
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelarEdicion}
                            style={styles.botonCancelar}
                          >
                            ✗
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleComprado(producto.id)}
                            style={{
                              ...styles.botonAccion,
                              backgroundColor: producto.comprado
                                ? "#f39c12"
                                : "#2ecc71",
                            }}
                          >
                            {producto.comprado ? "Desmarcar" : "Comprar"}
                          </button>
                          <button
                            onClick={() => iniciarEdicion(producto)}
                            style={styles.botonAccion}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarProducto(producto.id)}
                            style={{
                              ...styles.botonAccion,
                              backgroundColor: "#e74c3c",
                            }}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.listaVacia}>No hay productos en la lista</p>
      )}

      {/* Estadísticas */}
      {productos.length > 0 && (
        <div style={styles.contador}>
          <span>Total: {productos.length}</span>
          <span>Comprados: {productos.filter((p) => p.comprado).length}</span>
          <span>
            Pendientes: {productos.filter((p) => !p.comprado).length}
          </span>
        </div>
      )}
    </div>
  );
}

// Estilos (CSS-in-JS)
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  titulo: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px",
  },
  formulario: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minWidth: "200px",
    fontSize: "16px",
  },
  select: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    fontSize: "16px",
  },
  botonAgregar: {
    padding: "12px 25px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  categoriasContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  categoria: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  subtitulo: {
    color: "#3498db",
    marginTop: "0",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "2px solid #f0f0f0",
  },
  lista: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #eee",
    marginBottom: "10px",
    backgroundColor: "#fafafa",
    borderRadius: "6px",
    transition: "all 0.2s",
  },
  botones: {
    display: "flex",
    gap: "8px",
  },
  botonAccion: {
    padding: "8px 15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  botonGuardar: {
    padding: "8px 15px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  botonCancelar: {
    padding: "8px 15px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  inputEdicion: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginRight: "10px",
    fontSize: "16px",
  },
  listaVacia: {
    color: "#7f8c8d",
    textAlign: "center",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    fontSize: "18px",
  },
  contador: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    fontWeight: "bold",
    color: "#2c3e50",
  },
};

export default App;