@extends('layouts.app')

@section('titulo', 'Categorias — Loja Web 2')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>
    <h1>🗂️ Categorias</h1>
    <p class="sub">Escolha uma categoria para visualizar seus detalhes e os produtos relacionados.</p>

    <div class="grid">
        @forelse ($categorias as $categoria)
            <a class="card" href="/categorias/{{ $categoria->id }}">
                <div class="emoji">{{ $categoria->emoji }}</div>
                <p class="nome">{{ $categoria->nome }}</p>
                <p class="sub">{{ $categoria->descricao }}</p>
                <span class="cat">Ver produtos →</span>
            </a>
        @empty
            <p>Nenhuma categoria cadastrada.</p>
        @endforelse
    </div>
@endsection
