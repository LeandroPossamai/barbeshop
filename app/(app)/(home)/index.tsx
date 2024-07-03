'use client'

import { About } from './about'
import { Barbers } from './barbers'
import { Beards } from './beards'
import { Footer } from './footer'
import { Haircuts } from './haircuts'
import { Header } from './header'
import { Navbar } from './navbar'

export function Home() {
  return (
    <>
      <Navbar />
      <Header />
      {/* Seção dos barbeiros */}
      <Barbers />
      {/* Sobre Nós */}
      <About />
      {/* Cortes de Cabelo */}
      <Haircuts />
      {/* Seção de Barbas */}
      <Beards />
      {/* Seção de Contato e Rodapé */}
      <Footer />
    </>
  )
}
