import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteBtns from "./Buttons/Delete-Btns";

function LandingPage() {
  const [projects, setProjects] = useState([]); // Estado para guardar los proyectos
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  // Hacer la llamada al backend para obtener los proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/projectCard"); // Llamada a tu backend
        const infoObj = await response.json();
        setProjects(infoObj.data); // Actualizar el estado con los proyectos obtenidos
        setLoading(false); // Desactivar el loading una vez obtenidos los datos
      } catch (error) {
        setLoading(false); // Desactivar el loading en caso de error
      }
    };

    fetchProjects();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para eliminar un proyecto
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/projectCard/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Si se elimina correctamente, actualizamos el estado
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.idproyectos !== projectId)
        );
        console.log("Proyecto eliminado con éxito");
      } else {
        console.error("Error al eliminar el proyecto");
      }
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  // Si está cargando, mostramos un mensaje
  if (loading) {
    return <p>Cargando proyectos...</p>;
  }

  return (
    <div className="landing-page">
      <section className="hero">
        <h2 className="title">Proyectos molones</h2>
        <p className="hero__text">Vitrina para coleccionar ideas digitales</p>
      </section>
      <Link to="/create" className="button--large">
        Nuevo proyecto
      </Link>

      {/* Mapeamos los proyectos obtenidos de la base de datos */}
      {projects.length > 0 ? (
        <section className="preview landingPageCard">
          {projects.map((project) => (
            <article className="card" key={project.id_proyecto}>
              <h2 className="card__projectTitle">
                <span className="card__projectTitle--text">
                  {project.nombre_proyecto}
                </span>
              </h2>

              <div className="card__author">
                <p className="card__job">{project.trabajo}</p>
                <div
                  className="card__authorPhoto"
                  style={{
                    backgroundImage: `url(${project.foto_autora})`,
                  }}
                ></div>
                <h3 className="card__name">{project.nombre_autora}</h3>
              </div>

              <div className="card__project">
                <h3 className="card__name">{project.nombre_proyecto}</h3>
                <p className="card__slogan">{project.slogan}</p>
                <h3 className="card__descriptionTitle">Descripción</h3>
                <p className="card__description">{project.descripcion}</p>

                <div className="card__technicalInfo">
                  <p className="card__technologies">{project.tecnologias}</p>

                  <a
                    className="icon icon__www"
                    href={project.demo}
                    title="Haz click para ver el proyecto online"
                    target="_bl ank"
                    rel="noopener noreferrer"
                  >
                    Web link
                  </a>
                  <a
                    className="icon icon__github"
                    href={project.repositorio}
                    title="Haz click para ver el código del proyecto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub link
                  </a>
                </div>
                <DeleteBtns
                  onClick={() => handleDeleteProject(project.idproyectos)}
                >
                  Eliminar
                </DeleteBtns>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p>No hay proyectos disponibles.</p>
      )}
    </div>
  );
}

export default LandingPage;
