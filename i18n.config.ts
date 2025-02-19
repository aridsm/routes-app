export default defineI18nConfig(() => ({
  legacy: false,
  locale: "pt",
  messages: {
    en: {
      header: {
        insert: "Enter at least two locations to calculate the route",
      },
      tabs: {
        navigate: "Navigate",
        savedRoutes: "Saved routes",
      },
      buttons: {
        delete: "Delete",
        edit: "Edit",
        back: "Back",
        save: "Save changes",
        restore: "Restore modifications",
      },
      errors: {
        errorGetRoutes:
          "It was not possible to calculate the route to the selected locations.",
        errorGetCurrentLocation:
          "It was not possible to obtain the current location. Check location access in your browser.",
      },
      labels: {
        myGithub: "My GitHub",
        noRouteAdded: "No routes added",
        addRoute: "Add route",
        wantToDeleteItem: "Do you want to delete the selected item?",
        routeWasDeleted: 'The route "{obj}" has been successfully deleted!',
        meansOfLocomotion: "Means of Locomotion",
        routes: "Locations",
        addDestination: "Add destination",
        atLeastTwo: "At least two coordinates must be filled in",
        useCurrentLocation: "Use current location",
        calculateRoute: "Calculate route",
        howToGetThere: "How to Get There",
        confirmExit:
          "There are unsaved changes. Do you want to leave the current page?",
        undoChanges: "Do you want to undo the changes?",
        routeWasRestored:
          'The "{obj}" route has been restored to the previous version!',
        routeWasUpdated: 'The route "{obj}" has been successfully updated!',
        routeWasCreated: 'The route "{obj}" has been successfully created!',
        saveChanges: "Want to save your changes?",
        car: "Car",
        bicycle: "Bicycle",
        afoot: "Afoot",
        path: "Stretch",
        options: "Options",
        routeName: "Route name",
        create: "Create route",
        loading: "Loading...",
        typeAvalue: "Enter a value",
        location: "Location",
        noResults: "No results",
        confirm: "Confirm",
        continue: "Do you want to continue?",
        edit: "Edit route",
      },
    },
    pt: {
      header: {
        insert: "Insira pelo menos duas localizações para calcular o percurso",
      },
      tabs: {
        navigate: "Navegar",
        savedRoutes: "Suas rotas",
      },
      buttons: {
        delete: "Excluir",
        edit: "Editar",
        back: "Voltar",
        save: "Salvar alterações",
        restore: "Restaurar modificações",
      },
      errors: {
        errorGetRoutes:
          "Não foi possível calcular o percurso para as localidades selecionadas",
        errorGetCurrentLocation:
          "Não foi possível obter a localização atual. Verifique o acesso à localização no seu navegador.",
      },
      labels: {
        myGithub: "Meu GitHub",
        noRouteAdded: "Nenhuma rota adicionada!",
        addRoute: "Adicionar rota",
        wantToDeleteItem: "Deseja excluir o item selecionado?",
        routeWasDeleted: 'A rota "{obj}" foi excluída com sucesso!',
        meansOfLocomotion: "Meios de Locomoção",
        routes: "Localidades",
        addDestination: "Adicionar destino",
        atLeastTwo: "Ao menos duas coordenadas devem estar preenchidas",
        useCurrentLocation: "Usar localização atual",
        calculateRoute: "Calcular percurso",
        howToGetThere: "Como chegar",
        confirmExit: "Há mudanças não salvas. Deseja sair da página atual?",
        undoChanges: "Deseja desfazer as alterações?",
        routeWasRestored:
          'A rota "{obj}" foi restaurada para a versão anterior!',
        routeWasUpdated: 'A rota "{obj}" foi atualizada com sucesso!',
        routeWasCreated: 'A rota "{obj}" foi criada com sucesso!',
        saveChanges: "Deseja salvar as alterações?",
        car: "Carro",
        bicycle: "Bicicleta",
        afoot: "A pé",
        path: "Trecho",
        options: "Opções",
        routeName: "Nome da rota",
        create: "Criar rota",
        loading: "Carregando...",
        typeAvalue: "Digite...",
        location: "Localização",
        noResults: "Nenhum resultado",
        confirm: "Confirmar",
        continue: "Deseja continuar?",
        edit: "Editar rota",
      },
    },
  },
}));
