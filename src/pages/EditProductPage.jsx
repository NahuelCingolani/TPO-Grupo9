const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Error al cargar el producto');
        navigate('/');
      });
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al actualizar el producto');

      alert('Producto actualizado con éxito');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar el producto');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar el producto');

      alert('Producto eliminado con éxito');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el producto');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="edit-product-page">
      <h2>Editar Producto</h2>
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onDelete={handleDelete} // Eliminar pasa por la página, no el formulario
      />
    </div>
  );
};
