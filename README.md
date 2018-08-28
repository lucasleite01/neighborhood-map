# Apresentação

Este arquivo README descreve de forma simplificada o processo de desenvolvimento do projeto desenvolvido para alcançar as especificações do projeto Neighborhood Map.
As modificações citadas a seguir podem ser verificadas a partir de comentários presentes nos arquivos.

# Funcionamento

Com a perfeita execução do projeto será possível, além de outras coisas:
1. Filtrar locais da lista a partir da inserção de palavras no campo de busca;
2. Visualização de informações dos locais listados;
3. Sincronismo entre os marcadores no mapa e a lista mostrada à esquerda.

Para executar o projeto corretamente é necessário apenas abrir o arquivo index.html em um navegador web. Não é necessário a instalação de nenhum plugin ou ferramente extra. Basta apenas extratir corretamente os arquivos do projeto em uma pasta e manter sua atual organização.

# Index.html

1. Inicialmente formulei a estrutura HTML básica com a qual a aplicação funcionaria.
2. Através do KnockoutJS fui verificando a necessidade e adicionando bindings ao arquivo, ao mesmo tempo que desenvolvia o ModelView no arquivo **js/app.js**.

# /js/app.js

Nesse arquivo está presente a descrição do viewModel que faz o controle dos dados que serão manipulados no Model para serem visualizados no View.
Nele são feitas todas as associações necessárias para que as funcionalidades da lista sejam implementadas corretamente.
Para verificar com mais detalhes a implementação basta checar o código e seus comentários.
Utilizei a [documentação do KnockoutJS](http://knockoutjs.com/documentation/introduction.html) para me orientar no desenvolvimento.

# js/map.js

Nesse arquivo está presente o código que trata de toda a funcionalidade presente no mapa, inclusive as que se reacionam com a lista, como a listagem de marcadores por filtro, de acordo com a filtragem feita na lista.
Para maiores detalhes da implementação basta chegar o código e seus comentários.
Para iniciar a abordagem de solução do problema utilizei código de aulas da Udacity, modificando-o para melhor adequação ao que estava sendo implementado. Código baseado em fontes da internet possuem comentários específicos no código explicitando sua utilização.

# Fontes externas

O CSS foi obtido através [deste](http://materializecss.com) endereço.
