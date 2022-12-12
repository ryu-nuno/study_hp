class User::CustomersController < ApplicationController

  def new
    @customer = Customer.new
  end

  def create
    @customer = Customer.new(customer_params)
    @customer.user_id = current_user.id
    if @customer.save
      flash[:notice]="You have creatad customer successfully."
      redirect_to customers_path(@customer)
    else
      @user = current_user
      @customers = Customer.all
      render :new
    end
  end

  def index
    @user = current_user
    @customers = Customer.all.page(params[:page])
  end

  def show
    @customer = Customer.find(params[:id])
  end

  def edit
    @customer =Customer.find(params[:id])
  end

  def update
    customer = Customer.find(params[:id])
    if customer.update(customer_params)
      redirect_to customer_path(customer.id)
    else
      @customer = Customer.find(params[:id])
      render :edit
    end
  end

  def destroy
    @customer = Customer.find(params[:id])
    @customer.destroy
    redirect_to customers_path
  end

  def search
    @customers = Customer.search(params[:keyword])
    @keyword = params[:keyword]
    render "index"
  end

  private

  def customer_params
    params.require(:customer).permit(:customer_name, :memo, :telephone_number, :address, :manager)
  end

end
