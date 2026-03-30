/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Wrench, 
  Search, 
  Package, 
  Smartphone, 
  CheckCircle2, 
  Calendar, 
  DollarSign,
  AlertCircle,
  BarChart3,
  Layers,
  ShieldCheck,
  Zap
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { cn } from "./lib/utils";

// --- Data ---

const marketData = [
  { year: "2022", value: 184, label: "R$ 184B" },
  { year: "2023", value: 240, label: "R$ 240B" },
  { year: "2024", value: 257, label: "R$ 257B" },
  { year: "2025*", value: 270, label: "R$ 270B" },
];

const painPoints = [
  {
    title: "Estoque Parado",
    desc: "Peças sem saída viram capital morto no depósito.",
    icon: <Package className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Busca Manual",
    desc: "Horas perdidas em ligações e WhatsApp sem sucesso.",
    icon: <Search className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Falta de Conexão",
    desc: "Oficinas vizinhas não negociam por falta de canal.",
    icon: <Users className="w-6 h-6 text-orange-500" />,
  },
];

const modules = [
  "Cadastro e Autenticação",
  "Gestão de Perfil",
  "Controle de Estoque",
  "Marketplace Público",
  "Demandas de Compra",
  "Gestão de Propostas",
  "Registro de Transações",
  "Painel Administrativo",
];

const timeline = [
  { phase: "Descoberta", weeks: "1-2", desc: "Regras de negócio e escopo." },
  { phase: "Design", weeks: "3-4", desc: "Wireframes e Arquitetura." },
  { phase: "Desenvolvimento", weeks: "5-9", desc: "Implementação dos 8 módulos." },
  { phase: "Testes", weeks: "10-11", desc: "Homologação e fluxo crítico." },
  { phase: "Publicação", weeks: "12", desc: "Deploy e Entrega Final." },
];

const investment = [
  { label: "Ato da Assinatura", value: "R$ 8.250,00", percent: "30%", week: "0" },
  { label: "Aprovação do Design", value: "R$ 6.875,00", percent: "25%", week: "4" },
  { label: "Entrega do MVP", value: "R$ 6.875,00", percent: "25%", week: "9" },
  { label: "Publicação Final", value: "R$ 5.500,00", percent: "20%", week: "12" },
];

// --- Components ---

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={cn("min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden", className)}>
    {children}
  </section>
);

const DeviceSimulation = () => (
  <div className="relative w-full max-w-md mx-auto mt-12">
    {/* Desktop Background */}
    <div className="hidden md:block absolute -right-20 -top-10 w-full h-64 bg-slate-800 rounded-lg shadow-2xl border-4 border-slate-700 overflow-hidden opacity-50">
      <div className="h-4 bg-slate-700 flex items-center px-2 gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-slate-600 rounded" />
        <div className="grid grid-cols-3 gap-2">
          <div className="h-20 bg-slate-600 rounded" />
          <div className="h-20 bg-slate-600 rounded" />
          <div className="h-20 bg-slate-600 rounded" />
        </div>
      </div>
    </div>
    
    {/* Mobile Foreground */}
    <div className="relative z-10 w-64 mx-auto h-[500px] bg-black rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20" />
      <div className="h-full bg-slate-50 p-4 pt-10 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-lg" />
          <div className="w-8 h-8 bg-slate-200 rounded-full" />
        </div>
        <div className="h-8 w-full bg-slate-200 rounded-full mb-4 flex items-center px-3">
          <Search className="w-3 h-3 text-slate-400 mr-2" />
          <div className="h-2 w-20 bg-slate-300 rounded" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-slate-300" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-slate-200 rounded" />
                <div className="h-2 w-1/2 bg-slate-100 rounded" />
                <div className="flex justify-between">
                  <div className="h-3 w-12 bg-orange-100 rounded" />
                  <div className="h-3 w-10 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto h-12 w-full bg-orange-500 rounded-xl flex items-center justify-center text-white text-xs font-bold">
          COMPRAR PEÇA
        </div>
      </div>
    </div>
  </div>
);

const TransactionFlow = () => (
  <div className="mt-12 space-y-6 max-w-lg mx-auto">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <Wrench className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-sm font-bold text-slate-800">Oficina A (Vendedor)</p>
        <p className="text-xs text-slate-500">"Tenho um Kit Embreagem parado há 3 meses."</p>
        <div className="mt-2 text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded inline-block">
          Publicado no Marketplace
        </div>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="h-8 w-px bg-slate-200 relative">
        <ArrowRight className="w-4 h-4 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-right">
        <p className="text-sm font-bold text-slate-800">Oficina B (Comprador)</p>
        <p className="text-xs text-slate-500">"Preciso desse kit para um cliente hoje!"</p>
        <div className="mt-2 text-[10px] bg-orange-50 text-orange-700 px-2 py-1 rounded inline-block">
          Proposta Enviada
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
        <Wrench className="w-6 h-6 text-orange-600" />
      </div>
    </div>

    <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shadow-xl">
      <p className="text-xs font-medium opacity-70">Transação Segura</p>
      <p className="text-lg font-bold">R$ 850,00</p>
      <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full w-full bg-orange-500" />
      </div>
      <p className="text-[10px] mt-2 text-orange-400">Comissão da Plataforma: R$ 85,00 (10%)</p>
    </div>
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextStep();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevStep();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-orange-200">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <motion.div 
          className="h-full bg-orange-500"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 right-6 flex gap-3 z-50">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Section className="bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold mb-8"
                >
                  <TrendingUp className="w-4 h-4" />
                  OPORTUNIDADE DE R$ 257 BILHÕES
                </motion.div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                  Marketplace B2B <br />
                  <span className="text-orange-500">de Peças</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                  Digitalizando o mercado de autopeças entre oficinas. 
                  Saia do analógico e entre na nova era da reposição automotiva.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-3xl font-bold text-orange-500">121k</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Oficinas no Brasil</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-3xl font-bold text-orange-500">93%</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Ainda no Analógico</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 col-span-2 md:col-span-1">
                    <p className="text-3xl font-bold text-orange-500">R$ 257B</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Movimentação Anual</p>
                  </div>
                </div>
                <button 
                  onClick={nextStep}
                  className="mt-12 px-8 py-4 bg-orange-500 rounded-full font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                >
                  Ver o Mercado <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </Section>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Section>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black">O Mercado</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-slate-600 leading-relaxed">
                      O setor de autopeças brasileiro é um dos mais robustos do mundo. 
                      O crescimento de <span className="font-bold text-orange-600">13,3%</span> em um único ano reflete a modernização necessária.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-sm text-slate-600">
                          <span className="font-bold">Frota Envelhecida:</span> 123 milhões de veículos com média de 10 anos.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-sm text-slate-600">
                          <span className="font-bold">Custo de Novos:</span> Alta de 85% nos carros novos impulsiona reparos.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-sm text-slate-600">
                          <span className="font-bold">Demanda:</span> Atendimentos em oficinas cresceram 52,5%.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[300px] w-full bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4">Faturamento (R$ Bilhões)</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={marketData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{fill: '#f8fafc'}}
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {marketData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? '#f97316' : '#cbd5e1'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Section className="bg-orange-50">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black">A Oportunidade</h2>
                </div>
                
                <p className="text-xl text-slate-700 mb-12">
                  R$ 100 bilhões por ano são movimentados só em reposição de peças. 
                  <span className="font-bold"> Onde estão as dores?</span>
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {painPoints.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100"
                    >
                      <div className="mb-6">{point.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{point.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-white/50 rounded-2xl border border-orange-200 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Benchmarking</p>
                    <p className="text-slate-700">
                      Startups como a <span className="font-bold">Mecanizou</span> já captaram US$ 14,5 milhões para digitalizar esse canal. O espaço está aberto.
                    </p>
                  </div>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Section>
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <Layers className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black">A Solução</h2>
                    </div>
                    <p className="text-lg text-slate-600 mb-8">
                      Uma plataforma completa (Web, iOS, Android) que cobre todo o ciclo de negociação B2B entre oficinas.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {modules.map((mod, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-bold text-slate-700">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 p-8 rounded-[3rem] border border-slate-200">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase mb-8">Simulação de Fluxo</p>
                    <TransactionFlow />
                    <DeviceSimulation />
                  </div>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Section className="bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black">Cronograma</h2>
                </div>

                <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                  {timeline.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-orange-500 border-4 border-slate-900 z-10" />
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <span className="text-orange-500 font-mono font-bold text-sm">Semanas {item.weeks}</span>
                        <h3 className="text-xl font-bold">{item.phase}</h3>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-bold">12 Semanas</p>
                  <p className="text-slate-400">Do Kickoff à Publicação Final</p>
                </div>
              </div>
            </Section>
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Section>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black mb-4">Investimento</h2>
                  <p className="text-xl text-slate-500">Transparência total e pagamento por entrega.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden mb-12">
                  <div className="p-8 md:p-12 bg-slate-900 text-white text-center">
                    <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">Valor Total do Projeto</p>
                    <p className="text-5xl md:text-7xl font-black">R$ 27.500</p>
                    <p className="text-slate-400 mt-4">Escopo fechado e prazo definido.</p>
                  </div>
                  <div className="p-6 md:p-12 grid md:grid-cols-2 gap-6">
                    {investment.map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">{item.label}</p>
                          <p className="text-xl font-black text-slate-800">{item.value}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-500">{item.percent}</p>
                          <p className="text-[10px] text-slate-400">Semana {item.week}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/5511992238760?text=Olá! Gostaria de aprovar a proposta do Marketplace B2B de Peças."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    APROVAR PROPOSTA
                  </a>
                  <a 
                    href="https://wa.me/5511992238760?text=Olá! Tenho algumas dúvidas sobre a proposta do Marketplace B2B de Peças."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                  >
                    <Smartphone className="w-6 h-6" />
                    FALAR NO WHATSAPP
                  </a>
                </div>
                
                <p className="text-center text-slate-400 text-sm mt-12">
                  * Aporte inicial de R$ 8.250,00 libera o início imediato.
                </p>
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-50">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentStep === i ? "bg-orange-500 scale-150" : "bg-slate-300 hover:bg-slate-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}
