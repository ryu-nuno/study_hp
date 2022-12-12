Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: "users/sessions",
  }


  #admin側


  #user側
  root to:'user/homes#top'
  resources :customers, only: [:new, :create, :index, :show, :destroy, :edit , :update], to: 'user/customers#'
  resources :histories, only: [:new, :create, :edit, :update, :destroy], to: 'user/histories#'

  resources :users, only: [:edit, :update], to: 'user/users#'
  get '/users/my_page', to:'user/users#show'


  #検索
  get 'search' => 'user/customers#search'





  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
