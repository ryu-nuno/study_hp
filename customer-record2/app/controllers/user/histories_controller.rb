class User::HistoriesController < ApplicationController

  def new
    @history =History.new
    @customer = params[:customer_id]
  end

  def edit
    @history =History.find(params[:id])
  end

  def update
    history = History.find(params[:id])
    if history.update(history_params)
      redirect_to customer_path(history.customer_id)
    else
      @history = History.find(params[:id])
      render :edit
    end
  end

  def create
    #customer = Customer.find(params[:customer_id])
    history = current_user.histories.new(history_params)
    #history.customer_id = customer.id
    history.save
    redirect_to customer_path(history.customer_id)
  end

  def destroy
    @history = History.find(params[:id])
    @history.destroy
    redirect_to customer_path
  end

  def history_params
    params.require(:history).permit(:id, :user_id, :customer_id, :action, :result, :caption)
  end

end
