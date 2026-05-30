import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  BackButton,
  Owner,
  Loading,
  IssuesList,
  PageActions,
  ButtonIssues,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../service/api";

export default function Repositorio() {
  const { nameRepositorio } = useParams();

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [stateIssues, setStateIssues] = useState("all");

  useEffect(() => {
    async function loadRepositorio() {
      const nomeRepo = nameRepositorio;

      const repositorioData = await api.get(`/repos/${nomeRepo}`);
      setRepositorio(repositorioData.data);
      setLoading(false);
    }

    loadRepositorio();
  }, [nameRepositorio]);

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = nameRepositorio;

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: stateIssues,
          per_page: 5,
          page,
        },
      });

      setIssues(response.data);
    }

    loadIssue();
  }, [nameRepositorio, page, stateIssues]);

  function handleIssues(state) {
    setStateIssues(
      state === "open" ? "open" : state === "closed" ? "closed" : "all",
    );
  }

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </Owner>

      <ButtonIssues>
        <button type="button" onClick={() => handleIssues("open")}>
          Issues Abertas
        </button>
        <button type="button" onClick={() => handleIssues("closed")}>
          Issues Fechadas
        </button>
        <button type="button" onClick={() => handleIssues("all")}>
          Todas as Issues
        </button>
      </ButtonIssues>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.state}</p>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage("back")}
          disabled={page < 2}
        >
          Anterior
        </button>

        <button type="button" onClick={() => handlePage("next")}>
          Próxima
        </button>
      </PageActions>
    </Container>
  );
}
