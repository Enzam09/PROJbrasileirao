const KEY = 'brasileirao-resultados-reais-v6';
let S = { teams: [], matches: [] };
let rodadaAtual = 1;

const CLUBS = {
  'Athletico-PR': ['CAP', '#c8102e', '#fff'],
  'Atlético-MG': ['CAM', '#111', '#fff'],
  'Bahia': ['BAH', '#0b57b7', '#fff'],
  'Botafogo': ['BOT', '#111', '#fff'],
  'Bragantino': ['RBB', '#d71920', '#fff'],
  'Chapecoense': ['CHA', '#0a8f3c', '#fff'],
  'Corinthians': ['COR', '#111', '#fff'],
  'Coritiba': ['CFC', '#1a7a3b', '#fff'],
  'Cruzeiro': ['CRU', '#1b4fa8', '#fff'],
  'Flamengo': ['FLA', '#c8102e', '#fff'],
  'Fluminense': ['FLU', '#7a1f3d', '#fff'],
  'Grêmio': ['GRE', '#1a6fc4', '#fff'],
  'Internacional': ['INT', '#d7191f', '#fff'],
  'Mirassol': ['MIR', '#f2c200', '#222'],
  'Palmeiras': ['PAL', '#0b7a3b', '#fff'],
  'Remo': ['REM', '#0a2a6b', '#fff'],
  'Santos': ['SAN', '#2b2b2b', '#fff'],
  'São Paulo': ['SAO', '#d7191f', '#fff'],
  'Vasco': ['VAS', '#111', '#fff'],
  'Vitória': ['VIT', '#b01022', '#fff']
};

// Resultados cadastrados das rodadas 1 a 32.
const JOGOS_DADOS = `
1|Botafogo|4|Cruzeiro|0
1|Mirassol|2|Vasco|1
1|São Paulo|2|Flamengo|1
1|Corinthians|1|Bahia|2
1|Chapecoense|4|Santos|2
1|Fluminense|2|Grêmio|1
1|Vitória|2|Remo|0
1|Internacional|0|Athletico-PR|1
1|Coritiba|0|Bragantino|1
1|Atlético-MG|2|Palmeiras|2
2|Athletico-PR|0|Corinthians|1
2|Cruzeiro|1|Coritiba|2
2|Vasco|1|Chapecoense|1
2|Bahia|1|Fluminense|1
2|Palmeiras|5|Vitória|1
2|Grêmio|5|Botafogo|3
2|Santos|1|São Paulo|1
2|Remo|2|Mirassol|2
2|Flamengo|1|Internacional|1
2|Bragantino|1|Atlético-MG|0
3|Vitória|1|Flamengo|2
3|Mirassol|2|Cruzeiro|2
3|Chapecoense|3|Coritiba|3
3|Atlético-MG|3|Remo|3
3|Vasco|0|Bahia|1
3|São Paulo|2|Grêmio|0
3|Athletico-PR|2|Santos|1
3|Fluminense|1|Botafogo|0
3|Corinthians|2|Bragantino|0
3|Internacional|1|Palmeiras|3
4|Flamengo|2|Mirassol|0
4|Botafogo|0|Vitória|0
4|Bahia|2|Chapecoense|0
4|Santos|2|Vasco|1
4|Palmeiras|2|Fluminense|1
4|Grêmio|2|Atlético-MG|1
4|Cruzeiro|1|Corinthians|1
4|Coritiba|0|São Paulo|1
4|Remo|1|Internacional|1
4|Bragantino|1|Athletico-PR|1
5|Athletico-PR|4|Botafogo|1
5|Grêmio|1|Bragantino|1
5|São Paulo|2|Chapecoense|0
5|Vasco|2|Palmeiras|1
5|Remo|0|Fluminense|2
5|Flamengo|2|Cruzeiro|0
5|Corinthians|0|Coritiba|2
5|Bahia|1|Vitória|1
5|Atlético-MG|1|Internacional|0
5|Mirassol|2|Santos|2
6|Chapecoense|1|Grêmio|1
6|Cruzeiro|3|Vasco|3
6|Bragantino|1|São Paulo|2
6|Palmeiras|1|Mirassol|0
6|Coritiba|1|Remo|0
6|Santos|1|Corinthians|1
6|Internacional|0|Bahia|1
6|Fluminense|3|Athletico-PR|2
6|Botafogo|0|Flamengo|3
6|Vitória|2|Atlético-MG|0
7|Chapecoense|0|Corinthians|0
7|Flamengo|3|Remo|0
7|Grêmio|2|Vitória|0
7|Vasco|3|Fluminense|2
7|Santos|1|Internacional|2
7|Mirassol|0|Coritiba|1
7|Atlético-MG|1|São Paulo|0
7|Athletico-PR|2|Cruzeiro|1
7|Palmeiras|2|Botafogo|1
7|Bahia|2|Bragantino|0
8|Corinthians|1|Flamengo|1
8|Vitória|1|Mirassol|0
8|Internacional|2|Chapecoense|0
8|Vasco|2|Grêmio|1
8|Remo|4|Bahia|1
8|Cruzeiro|0|Santos|0
8|Athletico-PR|2|Coritiba|0
8|São Paulo|0|Palmeiras|1
8|Fluminense|1|Atlético-MG|0
8|Bragantino|1|Botafogo|2
9|Palmeiras|2|Grêmio|1
9|Bragantino|3|Flamengo|0
9|Santos|2|Remo|0
9|Chapecoense|0|Atlético-MG|4
9|Fluminense|3|Corinthians|1
9|Coritiba|1|Vasco|1
9|Cruzeiro|3|Vitória|0
9|Bahia|3|Athletico-PR|0
9|Internacional|1|São Paulo|1
9|Botafogo|3|Mirassol|2
10|Grêmio|0|Remo|0
10|Mirassol|0|Bragantino|1
10|Corinthians|0|Internacional|1
10|Bahia|1|Palmeiras|2
10|Flamengo|3|Santos|1
10|Atlético-MG|2|Athletico-PR|1
10|Chapecoense|1|Vitória|1
10|Vasco|1|Botafogo|2
10|Coritiba|1|Fluminense|1
10|São Paulo|4|Cruzeiro|1
11|Cruzeiro|2|Bragantino|1
11|Corinthians|0|Palmeiras|0
11|Fluminense|1|Flamengo|2
11|Botafogo|2|Coritiba|2
11|Athletico-PR|2|Chapecoense|0
11|Internacional|0|Grêmio|0
11|Santos|1|Atlético-MG|0
11|Mirassol|1|Bahia|2
11|Vitória|2|São Paulo|0
11|Remo|1|Vasco|1
12|Flamengo|2|Bahia|0
12|Palmeiras|1|Athletico-PR|0
12|Bragantino|4|Remo|2
12|Santos|2|Fluminense|3
12|Coritiba|2|Atlético-MG|0
12|Internacional|1|Mirassol|2
12|Cruzeiro|2|Grêmio|0
12|Vitória|0|Corinthians|0
12|Vasco|2|São Paulo|1
12|Chapecoense|1|Botafogo|4
13|Fluminense|2|Chapecoense|1
13|Atlético-MG|0|Flamengo|4
13|Bragantino|0|Palmeiras|1
13|Athletico-PR|3|Vitória|1
13|Grêmio|1|Coritiba|0
13|Corinthians|1|Vasco|0
13|São Paulo|1|Mirassol|0
13|Remo|0|Cruzeiro|1
13|Botafogo|2|Internacional|2
13|Bahia|2|Santos|2
14|Mirassol|2|Corinthians|1
14|Internacional|2|Fluminense|0
14|Chapecoense|1|Bragantino|2
14|São Paulo|2|Bahia|2
14|Flamengo|2|Vasco|2
14|Cruzeiro|1|Atlético-MG|3
14|Athletico-PR|0|Grêmio|0
14|Vitória|4|Coritiba|1
14|Palmeiras|1|Santos|1
14|Botafogo|1|Remo|2
15|Vasco|1|Athletico-PR|0
15|Grêmio|0|Flamengo|1
15|Santos|2|Bragantino|0
15|Mirassol|1|Chapecoense|1
15|Corinthians|3|São Paulo|2
15|Remo|1|Palmeiras|1
15|Atlético-MG|1|Botafogo|1
15|Bahia|1|Cruzeiro|2
15|Fluminense|2|Vitória|2
15|Coritiba|2|Internacional|2
16|Athletico-PR|1|Flamengo|1
16|Chapecoense|2|Remo|3
16|Bragantino|2|Vitória|0
16|Botafogo|3|Corinthians|1
16|Bahia|1|Grêmio|1
16|Santos|0|Coritiba|3
16|Palmeiras|1|Cruzeiro|1
16|Fluminense|2|São Paulo|1
16|Internacional|4|Vasco|1
16|Atlético-MG|3|Mirassol|1
17|Coritiba|3|Bahia|2
17|Vasco|0|Bragantino|3
17|Corinthians|1|Atlético-MG|0
17|Remo|1|Athletico-PR|2
17|Cruzeiro|2|Chapecoense|1
17|Flamengo|0|Palmeiras|3
17|Mirassol|1|Fluminense|0
17|Grêmio|3|Santos|2
17|Vitória|2|Internacional|0
17|São Paulo|1|Botafogo|1
18|Remo|1|São Paulo|0
18|Cruzeiro|1|Fluminense|1
18|Vasco|0|Atlético-MG|1
18|Palmeiras|1|Chapecoense|0
18|Bragantino|3|Internacional|1
18|Santos|3|Vitória|1
18|Grêmio|1|Corinthians|3
18|Bahia|2|Botafogo|1
18|Flamengo|3|Coritiba|0
18|Athletico-PR|1|Mirassol|0
19|Corinthians|3|Remo|0
19|São Paulo|1|Athletico-PR|2
19|Internacional|1|Cruzeiro|2
19|Chapecoense|0|Flamengo|4
19|Coritiba|1|Palmeiras|3
19|Atlético-MG|1|Bahia|1
19|Mirassol|2|Grêmio|1
19|Fluminense|1|Bragantino|1
19|Vitória|1|Vasco|0
19|Botafogo|2|Santos|1
20|Remo|2|Vitória|0
20|Palmeiras|1|Atlético-MG|2
20|Grêmio|1|Fluminense|1
20|Flamengo|1|São Paulo|1
20|Bragantino|0|Coritiba|0
20|Cruzeiro|0|Botafogo|1
20|Bahia|1|Corinthians|1
20|Vasco|1|Mirassol|1
20|Santos|2|Chapecoense|2
20|Athletico-PR|2|Internacional|0
21|Atlético-MG|1|Bragantino|0
21|São Paulo|1|Santos|2
21|Botafogo|3|Grêmio|2
21|Coritiba|0|Cruzeiro|1
21|Corinthians|0|Athletico-PR|0
21|Vitória|0|Palmeiras|4
21|Fluminense|0|Bahia|0
21|Mirassol|2|Remo|1
21|Internacional|1|Flamengo|1
22|Flamengo|2|Vitória|0
22|Santos|0|Athletico-PR|2
22|Bragantino|0|Corinthians|2
22|Palmeiras|0|Internacional|0
22|Bahia|0|Vasco|0
22|Cruzeiro|3|Mirassol|1
22|Botafogo|1|Fluminense|1
22|Coritiba|2|Chapecoense|1
22|Remo|2|Atlético-MG|2
22|Grêmio|2|São Paulo|1
23|Internacional|1|Remo|1
23|Corinthians|1|Cruzeiro|2
23|Vitória|1|Botafogo|0
23|Mirassol|1|Flamengo|5
23|Vasco|0|Santos|3
23|Atlético-MG|3|Grêmio|0
23|Chapecoense|3|Bahia|3
23|São Paulo|1|Coritiba|1
23|Athletico-PR|1|Bragantino|1
23|Fluminense|3|Palmeiras|2
24|Botafogo|2|Athletico-PR|3
24|Coritiba|2|Corinthians|1
24|Santos|1|Mirassol|1
24|Chapecoense|1|São Paulo|0
24|Vitória|0|Bahia|2
24|Palmeiras|4|Vasco|1
24|Bragantino|1|Grêmio|0
24|Cruzeiro|2|Flamengo|1
24|Internacional|0|Atlético-MG|0
24|Fluminense|2|Remo|1
25|Remo|2|Coritiba|3
25|Bahia|3|Internacional|2
25|Mirassol|1|Palmeiras|1
25|Grêmio|3|Chapecoense|1
25|Flamengo|3|Botafogo|0
25|Corinthians|0|Santos|1
25|Athletico-PR|3|Fluminense|3
25|Vasco|3|Cruzeiro|1
25|São Paulo|2|Bragantino|1
25|Atlético-MG|2|Vitória|1
26|Vitória|1|Grêmio|0
26|Corinthians|1|Chapecoense|2
26|Botafogo|0|Palmeiras|0
26|Remo|0|Flamengo|1
26|Internacional|2|Santos|3
26|Cruzeiro|3|Athletico-PR|1
26|Coritiba|1|Mirassol|2
26|Fluminense|1|Vasco|0
26|São Paulo|2|Atlético-MG|0
26|Bragantino|2|Bahia|3
27|Bahia|2|Remo|1
27|Flamengo|2|Corinthians|1
27|Mirassol|2|Vitória|2
27|Santos|2|Cruzeiro|1
27|Botafogo|1|Bragantino|1
27|Palmeiras|2|São Paulo|0
27|Chapecoense|1|Internacional|2
27|Grêmio|1|Vasco|2
27|Atlético-MG|3|Fluminense|1
27|Coritiba|3|Athletico-PR|3
28|Athletico-PR|2|Bahia|1
28|Flamengo|2|Bragantino|1
28|Vitória|1|Cruzeiro|3
28|Corinthians|1|Fluminense|3
28|Grêmio|0|Palmeiras|0
28|São Paulo|1|Internacional|0
28|Vasco|5|Coritiba|0
28|Remo|1|Santos|2
28|Mirassol|2|Botafogo|0
28|Atlético-MG|1|Chapecoense|1
29|Palmeiras|1|Bahia|0
29|Fluminense|4|Coritiba|0
29|Athletico-PR|2|Atlético-MG|2
29|Santos|2|Flamengo|2
29|Cruzeiro|2|São Paulo|0
29|Botafogo|1|Vasco|2
29|Vitória|4|Chapecoense|0
29|Remo|1|Grêmio|1
29|Internacional|2|Corinthians|1
29|Bragantino|1|Mirassol|1
30|Bragantino|4|Cruzeiro|2
30|Chapecoense|1|Athletico-PR|4
30|Coritiba|1|Botafogo|1
30|Bahia|1|Mirassol|0
30|Palmeiras|4|Corinthians|1
30|Grêmio|1|Internacional|1
30|Flamengo|1|Fluminense|0
30|Atlético-MG|2|Santos|1
30|São Paulo|2|Vitória|1
30|Vasco|0|Remo|0
31|Corinthians|1|Vitória|1
31|Remo|1|Bragantino|1
31|Bahia|0|Flamengo|3
31|Grêmio|2|Cruzeiro|4
31|Fluminense|1|Santos|2
31|São Paulo|1|Vasco|0
31|Athletico-PR|0|Palmeiras|2
31|Atlético-MG|1|Coritiba|0
31|Botafogo|1|Chapecoense|0
31|Mirassol|2|Internacional|0
32|Flamengo|3|Atlético-MG|2
32|Coritiba|0|Grêmio|1
32|Santos|1|Bahia|1
32|Chapecoense|2|Fluminense|1
32|Vasco|3|Corinthians|2
32|Palmeiras|2|Bragantino|0
32|Vitória|1|Athletico-PR|1
32|Mirassol|1|São Paulo|1
32|Internacional|3|Botafogo|0
32|Cruzeiro|1|Remo|0
`;

const JOGOS_REAIS = JOGOS_DADOS.trim().split('\n').map(linha => {
  const [round, casa, hg, visitante, ag] = linha.split('|');
  return [Number(round), casa, Number(hg), visitante, Number(ag)];
});

const CLASSIFICACAO_BASE = {
  'Flamengo': { p: 70, j: 32, v: 21, e: 7, d: 4, gp: 64, gc: 27 },
  'Palmeiras': { p: 69, j: 32, v: 20, e: 9, d: 3, gp: 56, gc: 22 },
  'Cruzeiro': { p: 54, j: 32, v: 16, e: 6, d: 10, gp: 51, gc: 46 },
  'Athletico-PR': { p: 54, j: 32, v: 15, e: 9, d: 8, gp: 50, gc: 38 },
  'Fluminense': { p: 51, j: 32, v: 14, e: 9, d: 9, gp: 50, gc: 41 },
  'Atlético-MG': { p: 50, j: 32, v: 14, e: 8, d: 10, gp: 44, gc: 38 },
  'Bahia': { p: 50, j: 32, v: 13, e: 11, d: 8, gp: 45, gc: 40 },
  'Santos': { p: 46, j: 32, v: 12, e: 10, d: 10, gp: 49, gc: 47 },
  'São Paulo': { p: 43, j: 32, v: 12, e: 7, d: 13, gp: 37, gc: 36 },
  'Bragantino': { p: 41, j: 32, v: 11, e: 8, d: 13, gp: 39, gc: 38 },
  'Botafogo': { p: 39, j: 32, v: 10, e: 9, d: 13, gp: 44, gc: 51 },
  'Coritiba': { p: 39, j: 32, v: 10, e: 9, d: 13, gp: 38, gc: 50 },
  'Vasco': { p: 38, j: 31, v: 10, e: 8, d: 13, gp: 39, gc: 45 },
  'Vitória': { p: 38, j: 32, v: 10, e: 8, d: 14, gp: 35, gc: 46 },
  'Mirassol': { p: 37, j: 32, v: 9, e: 10, d: 13, gp: 37, gc: 45 },
  'Internacional': { p: 35, j: 32, v: 8, e: 11, d: 13, gp: 36, gc: 40 },
  'Grêmio': { p: 34, j: 32, v: 8, e: 10, d: 14, gp: 35, gc: 44 },
  'Corinthians': { p: 33, j: 32, v: 8, e: 9, d: 15, gp: 34, gc: 42 },
  'Remo': { p: 26, j: 32, v: 5, e: 11, d: 16, gp: 34, gc: 50 },
  'Chapecoense': { p: 21, j: 31, v: 4, e: 9, d: 18, gp: 32, gc: 63 }
};

function salvar() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch (erro) {
    console.error('Não foi possível salvar:', erro);
  }
}

function padrao() {
  S.teams = Object.keys(CLUBS).map((name, index) => ({
    id: index + 1,
    name
  }));
  gerar();
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(KEY));

    if (
      dados &&
      Array.isArray(dados.teams) &&
      Array.isArray(dados.matches)
    ) {
      S = dados;
      return;
    }
  } catch (erro) {
    console.warn('Dados salvos inválidos; serão recriados.', erro);
  }

  padrao();
  salvar();
}

function gerar() {
  S.matches = JOGOS_REAIS.map(([round, casa, hg, visitante, ag]) => {
    const home = S.teams.find(clube => clube.name === casa);
    const away = S.teams.find(clube => clube.name === visitante);

    if (!home || !away) return null;

    return {
      round,
      home: home.id,
      away: away.id,
      hg,
      ag
    };
  }).filter(Boolean);
}

const done = jogo => jogo.hg !== null && jogo.ag !== null;

function esc(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[caractere]);
}

const team = id =>
  S.teams.find(clube => clube.id === id) || {
    name: 'Clube desconhecido'
  };

function crest(nome, tamanho) {
  const clube = CLUBS[nome];

  let h = 0;

  for (const caractere of nome) {
    h = (h * 31 + caractere.charCodeAt(0)) % 360;
  }

  const codigo = clube
    ? clube[0]
    : nome.trim().slice(0, 3).toUpperCase();

  const fundo = clube
    ? clube[1]
    : `hsl(${h} 58% 42%)`;

  const texto = clube ? clube[2] : '#fff';

  const dimensoes = tamanho
    ? `;width:${tamanho}px;height:${tamanho}px;font-size:${tamanho * 0.3}px`
    : '';

  return `<span class="crest" style="background:${fundo};color:${texto}${dimensoes}">${esc(codigo)}</span>`;
}

const crestBig = nome => crest(nome, 58);

function teamNameTag(nome) {
  const clube = CLUBS[nome];

  let h = 0;

  for (const caractere of nome) {
    h = (h * 31 + caractere.charCodeAt(0)) % 360;
  }

  const fundo = clube
    ? clube[1]
    : `hsl(${h} 58% 42%)`;

  const texto = clube ? clube[2] : '#fff';

  return `<span class="team-name-tag" style="background:${fundo};color:${texto}">${esc(nome)}</span>`;
}

function tabela() {
  const dados = {};

  S.teams.forEach(clube => {
    const base = CLASSIFICACAO_BASE[clube.name];

    dados[clube.id] = {
      name: clube.name,
      p: base ? base.p : 0,
      j: base ? base.j : 0,
      v: base ? base.v : 0,
      e: base ? base.e : 0,
      d: base ? base.d : 0,
      gp: base ? base.gp : 0,
      gc: base ? base.gc : 0,
      f: []
    };
  });

  return Object.values(dados).sort((a, b) =>
    b.p - a.p ||
    b.v - a.v ||
    (b.gp - b.gc) - (a.gp - a.gc) ||
    b.gp - a.gp ||
    a.name.localeCompare(b.name)
  );
}

function renderTopo() {
  const classificacao = tabela();
  const jogos = S.matches.filter(done);

  const gols = jogos.reduce(
    (total, jogo) => total + jogo.hg + jogo.ag,
    0
  );

  document.getElementById('barra').style.width = '100%';

  document.getElementById('progtxt').textContent =
    `${jogos.length} placares cadastrados (rodadas 1 a 32)`;

  const lider = classificacao[0];

  document.getElementById('lider').innerHTML = lider
    ? `${crestBig(lider.name)}
       <div class="info">
         <small>Líder da classificação consultada</small>
         <h2>${esc(lider.name)}</h2>
       </div>
       <div class="pts">${lider.p}<em>pontos</em></div>`
    : '<div class="info"><h2>Sem clubes</h2></div>';

  document.getElementById('stats').innerHTML = `
    <div class="stat">
      <b>${S.teams.length}</b>
      <span>clubes</span>
    </div>
    <div class="stat">
      <b>${gols}</b>
      <span>gols nos jogos exibidos</span>
    </div>
    <div class="stat">
      <b>${jogos.length}</b>
      <span>partidas com placar</span>
    </div>
  `;
}

function zona(indice, total) {
  if (indice === 0) return "zc";
  if (total !== 20) return "";
  if (indice < 4) return "zl";
  if (indice < 6) return "zp";
  if (indice < 12) return "zs";
  if (indice >= 16) return "zr";

  return "";
}

// Linha divisória no fim de cada zona (classe aplicada na última linha da zona).
function linhaZona(indice, total) {
  if (total !== 20 || indice === 0 || indice >= total - 1) return "";

  const atual = zona(indice, total);
  const proxima = zona(indice + 1, total);

  if (atual === proxima) return "";
  if (proxima === "zr") return " lr";
  if (atual === "zl") return " ll";
  if (atual === "zp") return " lp";
  if (atual === "zs") return " ls";

  return "";
}

function renderTabela() {
  const clubes = tabela();

  const linhas = clubes.map((clube, indice) => {
    const forma = clube.f.slice(-5);

    while (forma.length < 5) {
      forma.unshift('');
    }

    const saldo = clube.gp - clube.gc;

    return `
      <tr class="${zona(indice, clubes.length)}${linhaZona(indice, clubes.length)}">
        <td class="pos">${indice + 1}</td>
        <td class="nm">
          ${crest(clube.name)}
          ${esc(clube.name)}
        </td>
        <td class="p">${clube.p}</td>
        <td>${clube.j}</td>
        <td>${clube.v}</td>
        <td class="opt">${clube.e}</td>
        <td class="opt">${clube.d}</td>
        <td class="opt">${clube.gp}:${clube.gc}</td>
        <td>${saldo > 0 ? '+' : ''}${saldo}</td>
        <td>
          <span class="form">
            ${forma.map(resultado => `<i class="${resultado}"></i>`).join('')}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  document.getElementById('tab').innerHTML = `
    <div class="panel">
      <h3>Classificação</h3>

      ${
        clubes.length
          ? `
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th class="nm">Clube</th>
                    <th>Pts</th>
                    <th>J</th>
                    <th>V</th>
                    <th class="opt">E</th>
                    <th class="opt">D</th>
                    <th class="opt">Gols</th>
                    <th>SG</th>
                    <th>Forma</th>
                  </tr>
                </thead>
                <tbody>${linhas}</tbody>
              </table>
            </div>

            <div class="legend">
              <span><i style="background:var(--gold)"></i>Líder</span>
              <span><i style="background:var(--blue)"></i>Libertadores (até 4º)</span>
              <span><i style="background:var(--lightblue)"></i>Pré-Libertadores (5º e 6º)</span>
              <span><i style="background:var(--orange)"></i>Sul-Americana (7º ao 12º)</span>
              <span><i style="background:var(--red)"></i>Rebaixamento (17º ao 20º)</span>
            </div>
          `
          : '<div class="empty">Cadastre clubes na aba Clubes para começar.</div>'
      }
    </div>
  `;
}

function renderJogos() {
  const rodadas = [
    ...new Set(S.matches.map(jogo => jogo.round))
  ].sort((a, b) => a - b);

  if (!rodadas.length) {
    document.getElementById('jog').innerHTML = `
      <div class="panel">
        <div class="empty">Nenhum resultado disponível.</div>
      </div>
    `;
    return;
  }

  if (!rodadas.includes(rodadaAtual)) {
    rodadaAtual = rodadas[0];
  }

  const botoes = rodadas.map(rodada => `
    <button
      data-r="${rodada}"
      class="${rodada === rodadaAtual ? 'on' : ''}"
    >
      ${rodada}
    </button>
  `).join('');

  const partidas = S.matches.filter(
    jogo => jogo.round === rodadaAtual
  );

  const htmlJogos = partidas.map(jogo => {
    const casa = team(jogo.home);
    const visitante = team(jogo.away);

    return `
      <div class="match">
        <div class="side h">
          <span>${esc(casa.name)}</span>
          ${crest(casa.name)}
        </div>

        <div class="score">
          <strong>${jogo.hg}</strong>
          <b>×</b>
          <strong>${jogo.ag}</strong>
        </div>

        <div class="side">
          ${crest(visitante.name)}
          <span>${esc(visitante.name)}</span>
        </div>

        <div class="st fim">Placar final</div>
      </div>
    `;
  }).join('');

  document.getElementById('jog').innerHTML = `
    <div class="panel">
      <h3>Jogos reais <small>Rodada ${rodadaAtual}</small></h3>

      <div class="chips" id="chips">
        ${botoes}
      </div>

      ${htmlJogos}

      <div class="hint">
        Resultados cadastrados das rodadas 1 a 32.
        A rodada 21 aparece com nove partidas na fonte consultada.
      </div>
    </div>
  `;

  const selecionado = document.querySelector('#chips .on');

  if (selecionado) {
    selecionado.scrollIntoView({
      block: 'nearest',
      inline: 'center'
    });
  }
}

// Lista de clubes sem função de remover.
function renderTimes() {
  document.getElementById('tim').innerHTML = `
    <div class="panel">
      <h3>Novo clube</h3>

      <div class="form-add">
        <input
          id="novo"
          placeholder="Nome do clube"
          maxlength="22"
          aria-label="Nome do clube"
        >

        <button class="btn" id="add">Adicionar</button>
      </div>

      <div class="hint">
        Os resultados reais listados permanecem apenas
        para clubes que estiverem cadastrados.
      </div>
    </div>

    <div class="panel" style="margin-top:12px">
      <h3>Clubes (${S.teams.length})</h3>

      ${
        S.teams.length
          ? S.teams.map(clube => `
              <div class="trow">
                ${crest(clube.name)}
                ${teamNameTag(clube.name)}
              </div>
            `).join('')
          : '<div class="empty">Nenhum clube cadastrado.</div>'
      }

      <div class="acts" style="border-top:1px solid var(--line)">
        <button class="btn sec" id="padrao">
          Restaurar os 20 clubes
        </button>
      </div>
    </div>
  `;
}

function tudo() {
  renderTopo();
  renderTabela();
  renderJogos();
  renderTimes();
}

// Navegação entre as abas.
document.getElementById('tabs').addEventListener('click', evento => {
  const botao = evento.target.closest('button');

  if (!botao) return;

  document.querySelectorAll('.tabs button').forEach(item => {
    item.classList.toggle('on', item === botao);
  });

  ['tab', 'jog', 'tim'].forEach(id => {
    document.getElementById(id).hidden = id !== botao.dataset.t;
  });
});

// Seleção das rodadas.
document.getElementById('jog').addEventListener('click', evento => {
  const botao = evento.target.closest('[data-r]');

  if (!botao) return;

  rodadaAtual = Number(botao.dataset.r);
  renderJogos();
});

// Adicionar clubes e restaurar a lista padrão.
// Não existe código para remover clubes.
document.getElementById('tim').addEventListener('click', evento => {
  const botao = evento.target.closest('button');

  if (!botao) return;

  if (botao.id === 'add') {
    const campo = document.getElementById('novo');
    const nome = campo.value.trim();

    if (!nome) {
      alert('Digite o nome do clube.');
      return;
    }

    const jaExiste = S.teams.some(clube =>
      clube.name.toLowerCase() === nome.toLowerCase()
    );

    if (jaExiste) {
      alert('Esse clube já está cadastrado.');
      return;
    }

    const id = Math.max(0, ...S.teams.map(clube => clube.id)) + 1;

    S.teams.push({
      id,
      name: nome
    });

    gerar();
    salvar();
    tudo();

    return;
  }

  if (botao.id === 'padrao') {
    if (!confirm('Restaurar os 20 clubes padrão?')) {
      return;
    }

    padrao();
    salvar();
    tudo();
  }
});

// Permite adicionar um clube pressionando Enter.
document.getElementById('tim').addEventListener('keydown', evento => {
  if (evento.key === 'Enter' && evento.target.id === 'novo') {
    document.getElementById('add').click();
  }
});

// Inicialização do site.
carregar();
tudo();