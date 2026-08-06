const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";           // 13.3" x 7.5"
const W = 13.3, H = 7.5;

// paleta (do apostila)
const INK = "0D1B2A", INK2 = "13263B", PANEL = "142A42", LINE = "23405F";
const AMBER = "F4A259", AMBER2 = "F6BD60", TEAL = "4CC9B0", CORAL = "EF6F6C",
      SKY = "6FB1E0", PAPER = "F5F1E8", MUTED = "9DB4CC";
const HEAD = "Century Schoolbook", BODY = "Calibri", MONO = "Courier New";

const notes = (s, t) => s.addNotes(t);

// helper: fundo escuro
function bg(s){ s.background = { color: INK }; }

// helper: eyebrow mono
function eyebrow(s, txt){
  s.addText(txt.toUpperCase(), { x:0.7, y:0.55, w:8, h:0.35, fontFace:MONO,
    fontSize:12, color:AMBER, charSpacing:3, align:"left" });
}
// helper: número de slide grande de fundo
function ghost(s, n){
  s.addText(n, { x:10.4, y:5.0, w:2.6, h:2.4, fontFace:HEAD, fontSize:150,
    color:PANEL, bold:true, align:"right" });
}
// helper: barra de rodapé (texto, sem stripe)
function foot(s, txt){
  s.addText(txt, { x:0.7, y:7.02, w:12, h:0.3, fontFace:MONO, fontSize:9,
    color:"6D87A3", align:"left" });
}

// ============ SLIDE 1 — CAPA ============
let s = p.addSlide(); bg(s);
s.addText("git log --oneline", { x:0.7, y:0.6, w:6, h:0.4, fontFace:MONO, fontSize:13, color:TEAL });
s.addText([
  { text:"Controle de Versão\n", options:{ color:PAPER, breakLine:true } },
  { text:"com Git & GitHub", options:{ color:AMBER } },
], { x:0.7, y:2.2, w:11.9, h:2.6, fontFace:HEAD, fontSize:54, bold:true, align:"left", lineSpacing:56 });
s.addText("Do primeiro git init ao git push — rastreie cada alteração e colabore sem perder trabalho.",
  { x:0.72, y:4.7, w:9.5, h:0.8, fontFace:BODY, fontSize:18, color:MUTED });
// pílulas
const pills = ["init","add","commit","push"];
pills.forEach((t,i)=>{
  s.addShape(p.ShapeType.roundRect, { x:0.72+i*1.55, y:5.7, w:1.4, h:0.55, rectRadius:0.1,
    fill:{ color:INK2 }, line:{ color:AMBER, width:1 } });
  s.addText("git "+t, { x:0.72+i*1.55, y:5.7, w:1.4, h:0.55, fontFace:MONO, fontSize:12,
    color:AMBER2, align:"center", valign:"middle" });
});
s.addText("AULA · 06 / 08 / 2026", { x:0.7, y:6.7, w:6, h:0.3, fontFace:MONO, fontSize:11, color:"6D87A3", charSpacing:2 });
notes(s, "Slide de abertura. Apresente o tema: controle de versão com Git e GitHub. Vamos do primeiro comando até publicar na nuvem.");

// ============ SLIDE 2 — O QUE É CONTROLE DE VERSÃO ============
s = p.addSlide(); bg(s); eyebrow(s,"01 · Conceito"); ghost(s,"1");
s.addText("O que é controle de versão?", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:38, bold:true, color:PAPER });
s.addText([
  { text:"Um sistema (", options:{} },
  { text:"VCS / SCM", options:{ color:AMBER2, bold:true } },
  { text:") que rastreia o histórico de alterações em arquivos e coordena o trabalho de várias pessoas — registrando cada modificação ao longo de uma linha do tempo.", options:{} },
], { x:0.7, y:1.9, w:7.4, h:1.4, fontFace:BODY, fontSize:17, color:"D7E2EE", lineSpacing:24 });

// timeline de commits (formas)
const ty = 4.4;
const cx = [1.2, 3.4, 5.6, 7.8];
const labels = ["v. inicial","+ login","corrige bug","HEAD"];
s.addShape(p.ShapeType.line, { x:1.2, y:ty, w:6.6, h:0, line:{ color:AMBER, width:3 } });
cx.forEach((x,i)=>{
  const last = i===cx.length-1;
  s.addShape(p.ShapeType.ellipse, { x:x-0.25, y:ty-0.25, w:0.5, h:0.5,
    fill:{ color:last?AMBER:INK2 }, line:{ color:AMBER, width:3 } });
  s.addText(labels[i], { x:x-0.9, y:ty+0.4, w:1.8, h:0.4, fontFace:MONO, fontSize:10,
    color:last?TEAL:MUTED, align:"center" });
});
// cartão lateral direito
s.addShape(p.ShapeType.roundRect, { x:8.7, y:1.9, w:3.9, h:4.4, rectRadius:0.12, fill:{ color:INK2 }, line:{ color:LINE, width:1 } });
s.addText("Por que é essencial", { x:9.0, y:2.15, w:3.4, h:0.4, fontFace:HEAD, fontSize:16, bold:true, color:AMBER });
const bl = [
  "👥  Equipe em paralelo, sem sobrescrever",
  "⏪  Histórico completo — volte no tempo",
  "🌿  Branches para experimentar seguro",
  "💾  Cópia completa em cada máquina",
  "⚡  Qualidade e agilidade na entrega",
];
s.addText(bl.map((t,i)=>({ text:t, options:{ breakLine:true, paraSpaceAfter:10 } })),
  { x:9.0, y:2.7, w:3.4, h:3.4, fontFace:BODY, fontSize:13.5, color:"D7E2EE" });
foot(s,"Controle de Versão · Git & GitHub");
notes(s, "Controle de versão registra o que mudou, quando e por quem. Os 5 motivos: colaboração, histórico/backup, branches, redundância (distribuído) e qualidade.");

// ============ SLIDE 3 — GIT x GITHUB ============
s = p.addSlide(); bg(s); eyebrow(s,"02 · Distinção"); ghost(s,"2");
s.addText("Git × GitHub", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:38, bold:true, color:PAPER });
s.addText("O Git é a ferramenta. O GitHub é a plataforma.", { x:0.7, y:1.85, w:12, h:0.5, fontFace:BODY, fontSize:18, italic:true, color:SKY });

// dois cartões
function cartaoGG(x, cor, titulo, papel, linhas){
  s.addShape(p.ShapeType.roundRect, { x, y:2.6, w:5.5, h:3.9, rectRadius:0.14, fill:{ color:INK2 }, line:{ color:cor, width:2 } });
  s.addText(titulo, { x:x+0.3, y:2.85, w:4.9, h:0.6, fontFace:HEAD, fontSize:24, bold:true, color:cor });
  s.addText(linhas.map((t,i)=>({ text:t, options:{ breakLine:true, paraSpaceAfter:9 } })),
    { x:x+0.35, y:3.6, w:4.9, h:2.3, fontFace:BODY, fontSize:14, color:"D7E2EE" });
  s.addShape(p.ShapeType.roundRect, { x:x+0.3, y:5.9, w:2.4, h:0.45, rectRadius:0.08, fill:{ color:PANEL } });
  s.addText(papel, { x:x+0.3, y:5.9, w:2.4, h:0.45, fontFace:MONO, fontSize:11, color:cor, align:"center", valign:"middle" });
}
cartaoGG(0.7, AMBER, "GIT", "papel: CLIENTE", [
  "💻  Roda localmente no seu PC",
  "📦  Cópia completa do repositório",
  "🔒  Funciona offline",
  "⌨  Opera por linha de comando",
]);
cartaoGG(7.1, TEAL, "GITHUB", "papel: SERVIDOR", [
  "☁  Serviço online (nuvem)",
  "🔀  Pull requests e issues",
  "⚙  Automação com GitHub Actions",
  "🌐  Portfólio e colaboração",
]);
// seta push/pull entre os cartões (gap: 6.2 – 7.1)
s.addText([{text:"push ▶\n",options:{breakLine:true}},{text:"◀ pull",options:{}}],
  { x:6.15, y:4.0, w:0.9, h:0.7, fontFace:MONO, fontSize:9.5, color:AMBER2, align:"center" });
foot(s,"Ferramentas distintas e complementares");
notes(s, "Git = ferramenta de controle de versão local, distribuída, código aberto. GitHub = plataforma na nuvem que hospeda repositórios Git e adiciona colaboração.");

// ============ SLIDE 4 — CONTA E CONFIGURAÇÃO ============
s = p.addSlide(); bg(s); eyebrow(s,"03 · Preparação"); ghost(s,"3");
s.addText("Conta no GitHub + configurar o Git", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:34, bold:true, color:PAPER });

// coluna passos conta
s.addText("1 · Criar a conta", { x:0.7, y:2.0, w:5.5, h:0.4, fontFace:HEAD, fontSize:18, bold:true, color:AMBER });
const conta = [
  "Acesse github.com",
  "Clique em “Sign up”",
  "E-mail, senha e username",
  "Resolva o CAPTCHA",
  "Escolha o plano Free",
  "Confirme o e-mail",
];
s.addText(conta.map((t,i)=>({ text:(i+1)+".  "+t, options:{ breakLine:true, paraSpaceAfter:8 } })),
  { x:0.75, y:2.55, w:5.3, h:3.4, fontFace:BODY, fontSize:14.5, color:"D7E2EE" });

// coluna terminal config
s.addText("2 · Configurar o Git", { x:6.6, y:2.0, w:6, h:0.4, fontFace:HEAD, fontSize:18, bold:true, color:AMBER });
s.addShape(p.ShapeType.roundRect, { x:6.6, y:2.55, w:6, h:1.9, rectRadius:0.1, fill:{ color:"071019" }, line:{ color:LINE, width:1 } });
s.addText([
  { text:'$ git config --global user.name "Seu Nome"\n', options:{ color:PAPER, breakLine:true } },
  { text:'$ git config --global user.email "voce@ex.com"\n', options:{ color:PAPER, breakLine:true } },
  { text:'# use o MESMO e-mail da conta GitHub', options:{ color:"6D87A3" } },
], { x:6.85, y:2.75, w:5.6, h:1.5, fontFace:MONO, fontSize:12.5, lineSpacing:22 });

s.addText("3 · Autenticar o push", { x:6.6, y:4.7, w:6, h:0.4, fontFace:HEAD, fontSize:18, bold:true, color:AMBER });
s.addShape(p.ShapeType.roundRect, { x:6.6, y:5.25, w:2.85, h:1.25, rectRadius:0.1, fill:{ color:INK2 }, line:{ color:LINE, width:1 } });
s.addText([{text:"🔑 Token (PAT)\n",options:{bold:true,color:PAPER,breakLine:true}},{text:"substitui a senha",options:{color:MUTED}}],
  { x:6.75, y:5.4, w:2.6, h:1, fontFace:BODY, fontSize:12 });
s.addShape(p.ShapeType.roundRect, { x:9.75, y:5.25, w:2.85, h:1.25, rectRadius:0.1, fill:{ color:INK2 }, line:{ color:LINE, width:1 } });
s.addText([{text:"🔐 Chave SSH\n",options:{bold:true,color:PAPER,breakLine:true}},{text:"sem digitar sempre",options:{color:MUTED}}],
  { x:9.9, y:5.4, w:2.6, h:1, fontFace:BODY, fontSize:12 });
foot(s,"GitHub não aceita senha tradicional no terminal");
notes(s, "Passo a passo da conta e config global do Git. Autenticação por Personal Access Token ou chave SSH — o GitHub não aceita senha comum no git push.");

// ============ SLIDE 5 — REPOSITÓRIO ============
s = p.addSlide(); bg(s); eyebrow(s,"04 · Repositório"); ghost(s,"4");
s.addText("O que é um repositório?", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:36, bold:true, color:PAPER });
s.addText([
  { text:"Uma pasta especial com todos os arquivos ", options:{} },
  { text:"+ o histórico completo", options:{ color:AMBER2, bold:true } },
  { text:". A pasta oculta ", options:{} },
  { text:".git", options:{ fontFace:MONO, color:TEAL } },
  { text:" é o “cérebro” que monitora tudo.", options:{} },
], { x:0.7, y:1.85, w:11.8, h:0.9, fontFace:BODY, fontSize:17, color:"D7E2EE", lineSpacing:24 });

// dois métodos
s.addShape(p.ShapeType.roundRect, { x:0.7, y:3.0, w:5.8, h:3.4, rectRadius:0.14, fill:{ color:INK2 }, line:{ color:AMBER, width:2 } });
s.addText("Método 1 · do zero", { x:1.0, y:3.25, w:5.2, h:0.5, fontFace:HEAD, fontSize:19, bold:true, color:AMBER });
s.addShape(p.ShapeType.roundRect, { x:1.0, y:3.9, w:5.2, h:1.5, rectRadius:0.08, fill:{ color:"071019" }, line:{ color:LINE, width:1 } });
s.addText([
  { text:"$ cd caminho/da/pasta\n", options:{ color:PAPER, breakLine:true } },
  { text:"$ git init\n", options:{ color:PAPER, breakLine:true } },
  { text:"Initialized empty Git repo", options:{ color:MUTED } },
], { x:1.2, y:4.1, w:4.9, h:1.1, fontFace:MONO, fontSize:13, lineSpacing:22 });
s.addText("Cria a pasta .git e começa a monitorar o projeto.", { x:1.0, y:5.6, w:5.2, h:0.7, fontFace:BODY, fontSize:13, color:MUTED });

s.addShape(p.ShapeType.roundRect, { x:6.8, y:3.0, w:5.8, h:3.4, rectRadius:0.14, fill:{ color:INK2 }, line:{ color:TEAL, width:2 } });
s.addText("Método 2 · clonar", { x:7.1, y:3.25, w:5.2, h:0.5, fontFace:HEAD, fontSize:19, bold:true, color:TEAL });
s.addShape(p.ShapeType.roundRect, { x:7.1, y:3.9, w:5.2, h:1.5, rectRadius:0.08, fill:{ color:"071019" }, line:{ color:LINE, width:1 } });
s.addText([
  { text:"$ git clone \\\n", options:{ color:PAPER, breakLine:true } },
  { text:"  https://github.com/user/proj.git\n", options:{ color:TEAL, breakLine:true } },
  { text:"Cloning into 'proj'...", options:{ color:MUTED } },
], { x:7.3, y:4.1, w:4.9, h:1.1, fontFace:MONO, fontSize:12, lineSpacing:22 });
s.addText("Baixa todos os arquivos + todo o histórico de uma vez.", { x:7.1, y:5.6, w:5.2, h:0.7, fontFace:BODY, fontSize:13, color:MUTED });
foot(s,"git init  ·  git clone");
notes(s, "Repositório = arquivos + histórico + pasta .git. Duas formas de obter: iniciar do zero com git init, ou clonar um existente com git clone.");

// ============ SLIDE 6 — AS TRÊS ÁRVORES ============
s = p.addSlide(); bg(s); eyebrow(s,"05 · Fluxo"); ghost(s,"5");
s.addText("As Três Árvores do Git", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:36, bold:true, color:PAPER });

const trees = [
  { x:0.7,  cor:SKY,   t:"Working Directory", sub:"onde você edita" },
  { x:5.0,  cor:AMBER, t:"Staging Area",      sub:"prepara o commit" },
  { x:9.3,  cor:TEAL,  t:"HEAD",              sub:"histórico oficial" },
];
trees.forEach(tr=>{
  s.addShape(p.ShapeType.roundRect, { x:tr.x, y:2.5, w:3.3, h:2.1, rectRadius:0.12, fill:{ color:INK2 }, line:{ color:tr.cor, width:2 } });
  s.addText(tr.t, { x:tr.x+0.2, y:2.75, w:2.9, h:0.6, fontFace:HEAD, fontSize:17, bold:true, color:tr.cor, align:"center" });
  s.addText(tr.sub, { x:tr.x+0.2, y:3.5, w:2.9, h:0.6, fontFace:BODY, fontSize:13, color:MUTED, align:"center" });
});
// setas add / commit (gaps: 4.0–5.0 e 8.3–9.3)
s.addText("git add", { x:4.0, y:3.05, w:1.0, h:0.35, fontFace:MONO, fontSize:10, color:AMBER, align:"center" });
s.addText("git commit", { x:8.15, y:3.05, w:1.3, h:0.35, fontFace:MONO, fontSize:10, color:TEAL, align:"center" });
s.addShape(p.ShapeType.line, { x:4.05, y:3.55, w:0.9, h:0, line:{ color:AMBER, width:2, endArrowType:"triangle" } });
s.addShape(p.ShapeType.line, { x:8.35, y:3.55, w:0.9, h:0, line:{ color:TEAL, width:2, endArrowType:"triangle" } });

// ciclo prático embaixo
s.addText("O ciclo prático", { x:0.7, y:5.0, w:6, h:0.4, fontFace:HEAD, fontSize:16, bold:true, color:AMBER });
const ciclo = ["git status","git add .","git commit -m \"...\"","git log"];
ciclo.forEach((c,i)=>{
  s.addShape(p.ShapeType.roundRect, { x:0.7+i*3.05, y:5.5, w:2.8, h:0.7, rectRadius:0.1, fill:{ color:PANEL }, line:{ color:LINE, width:1 } });
  s.addText(c, { x:0.7+i*3.05, y:5.5, w:2.8, h:0.7, fontFace:MONO, fontSize:12.5, color:PAPER, align:"center", valign:"middle" });
  if(i<3) s.addText("→", { x:0.7+i*3.05+2.8, y:5.5, w:0.25, h:0.7, fontFace:BODY, fontSize:16, color:AMBER, align:"center", valign:"middle" });
});
foot(s,"add prepara · commit consolida");
notes(s, "As Três Árvores: Working Directory, Staging Area e HEAD. git add move para preparação; git commit consolida no histórico. Ciclo: status, add, commit, log.");

// ============ SLIDE 7 — CONECTAR AO GITHUB ============
s = p.addSlide(); bg(s); eyebrow(s,"06 · Sincronizar"); ghost(s,"6");
s.addText("Conectar o local ao GitHub", { x:0.7, y:1.0, w:12, h:0.8, fontFace:HEAD, fontSize:36, bold:true, color:PAPER });

s.addShape(p.ShapeType.roundRect, { x:0.7, y:2.05, w:6.6, h:3.75, rectRadius:0.1, fill:{ color:"071019" }, line:{ color:LINE, width:1 } });
s.addText([
  { text:"$ git remote add origin \\\n", options:{ color:PAPER, breakLine:true } },
  { text:"    https://github.com/voce/proj.git\n", options:{ color:TEAL, breakLine:true } },
  { text:"$ git branch -M main\n", options:{ color:PAPER, breakLine:true } },
  { text:"$ git push -u origin main\n", options:{ color:PAPER, breakLine:true } },
  { text:"Enumerating objects... done.\n", options:{ color:MUTED, breakLine:true } },
  { text:"Branch 'main' tracking 'origin/main'", options:{ color:MUTED } },
], { x:0.95, y:2.25, w:6.1, h:3.35, fontFace:MONO, fontSize:12.5, lineSpacing:20, valign:"top" });

// passos à direita
const etapas = ["Crie o repo remoto (New)","Copie a URL do repositório","Vincule: remote add origin","Defina a branch main","Envie: git push"];
s.addText(etapas.map((t,i)=>({ text:(i+1)+".  "+t, options:{ breakLine:true, paraSpaceAfter:12 } })),
  { x:7.7, y:2.2, w:4.9, h:3.2, fontFace:BODY, fontSize:15, color:"D7E2EE" });

s.addShape(p.ShapeType.roundRect, { x:0.7, y:5.9, w:11.9, h:0.75, rectRadius:0.1, fill:{ color:INK2 }, line:{ color:TEAL, width:1 } });
s.addText("🚀  Pronto! Repositório local criado, ativo e sincronizado com o GitHub.",
  { x:0.9, y:5.9, w:11.5, h:0.75, fontFace:BODY, fontSize:15, bold:true, color:TEAL, valign:"middle" });
foot(s,"do zero à nuvem");
notes(s, "Etapas finais: criar repo remoto no GitHub, copiar URL, git remote add origin, git branch -M main, git push -u origin main. Sincronizado!");

// ============ SLIDE 8 — RESUMO / ENCERRAMENTO ============
s = p.addSlide(); bg(s);
s.addText("git commit -m \"aula concluída\"", { x:0.7, y:0.6, w:8, h:0.4, fontFace:MONO, fontSize:13, color:TEAL });
s.addText("O caminho completo", { x:0.7, y:2.0, w:12, h:0.9, fontFace:HEAD, fontSize:44, bold:true, color:PAPER });
const seq = ["git init","git add .","git commit","git push","☁ nuvem"];
const cores = [AMBER, SKY, AMBER2, TEAL, TEAL];
seq.forEach((c,i)=>{
  const x = 0.7 + i*2.45;
  s.addShape(p.ShapeType.roundRect, { x, y:3.5, w:2.1, h:0.85, rectRadius:0.12,
    fill:{ color: i===4?TEAL:INK2 }, line:{ color:cores[i], width:2 } });
  s.addText(c, { x, y:3.5, w:2.1, h:0.85, fontFace:MONO, fontSize:13,
    color: i===4?INK:cores[i], bold:i===4, align:"center", valign:"middle" });
  if(i<4) s.addText("→", { x:x+2.1, y:3.5, w:0.35, h:0.85, fontFace:BODY, fontSize:18, color:MUTED, align:"center", valign:"middle" });
});
s.addText("Versione tudo. Colabore sem medo. Publique com um push.",
  { x:0.7, y:5.0, w:11.9, h:0.6, fontFace:BODY, fontSize:20, italic:true, color:MUTED });
s.addText("📖 Apostila completa  ·  🎬 Animação interativa  ·  📊 Estes slides",
  { x:0.7, y:6.2, w:11.9, h:0.5, fontFace:MONO, fontSize:12, color:"6D87A3" });
notes(s, "Encerramento: recapitule os cinco comandos essenciais. Direcione os alunos à apostila e à animação interativa.");

p.writeFile({ fileName: "/home/claude/apostila-git/slides_git_github.pptx" })
  .then(f => console.log("OK:", f));
