class Admin::UsersController < Admin::AdminController
  before_action :set_admin_user, only: %i[ edit update destroy ]

  # GET /admin/users or /admin/users.json
  def index
    @users = User.all
  end

  # GET /admin/users/new
  def new
    @user = User.new
  end

  # GET /admin/users/1/edit
  def edit
  end

  # POST /admin/users or /admin/users.json
  def create
    @user = User.new(admin_user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to admin_users_url, notice: "User was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/users/1 or /admin/users/1.json
  def update
    respond_to do |format|
      if @user.update(admin_user_params)
        format.html { redirect_to admin_users_url, notice: "User was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/users/1 or /admin/users/1.json
  def destroy
    @user.destroy!

    respond_to do |format|
      format.html { redirect_to admin_users_url, notice: "User was successfully destroyed." }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_user_params
      params.fetch(:user, {}).permit(:email, :password, :password_confirmation)
    end
end
