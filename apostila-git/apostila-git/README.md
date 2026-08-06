# 📘 Apostila — Controle de Versão, Git & GitHub

Material didático da aula de **06/08/2026** sobre controle de versão, com apostila
web interativa, slides e uma animação do fluxo do Git.

## 🌐 Conteúdo do repositório

| Arquivo | Descrição |
|---|---|
| `index.html` | **Apostila** completa, com ilustrações e blocos de terminal |
| `animacao.html` | **Animação interativa** do fluxo do Git (Três Árvores → nuvem) |
| `git.html` | **Guia passo a passo** para publicar este projeto no GitHub |
| `slides_git_github.pptx` | **Slides** da aula (8 telas), gerados conforme a apostila |
| `css/estilo.css` | Estilos da apostila |
| `js/script.js` | Barra de progresso, revelação ao rolar e botão “voltar ao topo” |

## 🚀 Como visualizar

Abra o `index.html` no navegador — ou publique com **GitHub Pages**
(*Settings › Pages › Branch: main*).

## 🧭 Tópicos abordados

1. **O que é controle de versão** e por que é essencial
2. **Git × GitHub** — ferramenta vs. plataforma
3. **Criar conta** no GitHub e **configurar** o Git
4. **Repositório**: `git init` e `git clone`
5. **As Três Árvores** e o ciclo `status → add → commit → log`
6. **Conectar ao GitHub**: `remote add`, `branch -M main`, `push`

## 🔧 Publicar este projeto (resumo)

```bash
git init
git add .
git commit -m "Adiciona apostila de controle de versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/apostila-git.git
git push -u origin main
```

> O passo a passo detalhado, com explicação de cada comando, está em **`git.html`**.

---

*Feito para fins didáticos. Sinta-se livre para clonar, adaptar e versionar.* ✨
