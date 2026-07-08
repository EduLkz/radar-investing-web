import React from 'react'
import "./About.css"

export default function About() {
  return (
    <div className='about'>
      <h1>Radar Investing</h1>
      <h2>
        Visão Geral
      </h2>
      <p className='about-text'>
        O Radar Investing é uma solução de software desenvolvida como Trabalho de Graduação na FATEC Carapicuíba, focada em fornecer uma base sólida para o controle de investimentos. O sistema oferece aos usuários um ambiente prático para o registro e a gestão de suas operações no mercado de renda variável.
      </p>
      <br/>
      <br/>
      <h2>
        Funcionalidades Atuais
      </h2>
      <p className='about-text'>
        Nesta primeira entrega, o sistema foca na precisão do controle operacional, permitindo ao usuário:
      </p>
      <ul className="about-list">
        <li>Simulação de Operações: Execução de ordens de compra e venda em um ambiente controlado.</li>
        <li>Gestão de Custos: Acompanhamento detalhado do preço médio e dos custos de aquisição de cada ativo em carteira.</li>
        <li>Integração de Dados: Utilização da API da Bovespa para a atualização e consulta de cotações em tempo real, garantindo fidelidade aos preços de mercado.</li>
      </ul>
      <br/>
      <br/>
      <h2>
        Visão de Futuro
      </h2>
      <p className='about-text'>
        O projeto foi estruturado para ser escalável. As funcionalidades de análise avançada e educação financeira estão mapeadas como evoluções futuras, visando transformar a ferramenta de um gestor de operações em uma plataforma completa de análise estratégica e inteligência financeira para o investidor.
      </p>
      <ul className="about-list">
        <li>Dashboard Analítico de Performance: Implementação de gráficos interativos para visualização da curva de rentabilidade da carteira ao longo do tempo</li>
        <li>Módulo de Inteligência e Alertas: Criação de um sistema de notificações personalizado para avisar o usuário sobre variações percentuais significativas nos preços de seus ativos monitorados.</li>
        <li>Filtros de Análise Fundamentalista: Integração de novos indicadores de mercado (como P/L, DY e VPA) para auxiliar na tomada de decisão sobre novos ativos</li>
        <li>Exportação de Relatórios: Funcionalidade para gerar resumos de operações em formatos como PDF ou CSV, facilitando o controle externo e organização fiscal.</li>
        <li>Base de Conhecimento Integrada: Inclusão de um portal educacional com artigos e guias sobre conceitos do mercado financeiro para apoiar investidores iniciantes.</li>
      </ul>
      <br/>
      <br/>
      <p className='about-text'>
        Nosso objetivo é oferecer uma experiência prática e direta, onde o usuário mantém o controle total sobre suas operações de forma organizada. Com uma estrutura pensada para a escalabilidade, o Radar Investing evolui constantemente para integrar novas funcionalidades que transformarão a plataforma em um ecossistema completo de inteligência financeira.
      </p>
    </div>
  )
}
