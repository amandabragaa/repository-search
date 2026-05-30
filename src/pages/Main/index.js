import React, { useState, useCallback, useEffect } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { Link } from "react-router-dom";
import api from "../../service/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
    setLoaded(true);
  }, []);

  // Salvar alterações
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios, loaded]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setAlert(null);

      try {
        if (newRepo === "") {
          throw new Error("Você precisa indicar um repositório");
        }

        const response = await api.get(`/repos/${newRepo}`);

        const hasRepo = repositorios.find((repo) => repo.full_name === newRepo);

        if (hasRepo) {
          throw new Error("Repositório Duplicado");
        }

        const data = {
          full_name: response.data.full_name,
        };
        setRepositorios((prev) => [...prev, data]);
        setNewRepo("");
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [newRepo, repositorios],
  );

  const handleDelete = useCallback((repoName) => {
    setRepositorios((prev) =>
      prev.filter((repo) => repo.full_name !== repoName),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} $error={alert}>
        <input
          type="text"
          placeholder="Adicionar repositórios"
          value={newRepo}
          onChange={(e) => {
            setNewRepo(e.target.value);
            setAlert(null);
          }}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.full_name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.full_name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.full_name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.full_name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
