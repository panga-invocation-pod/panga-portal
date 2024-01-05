# frozen_string_literal: true

# Controller concern for basic crud.
# Can be added to any controller like so
# include Crud
# Assumptions:
#  1. Model class defines a constant called WHITELIST_FIELDS
#     as an array of symbols for attributed that are allowed for creating a record.
#  2. Model is serialized elsewhwere. This can be done either by overwriting as_json
#     method in the model class, or by using separate serializers. By default as_json
#     will render all the model attributes.
module Crud
  extend ActiveSupport::Concern

  included do
    before_action :set_model_vars

    # List records
    def index
      render_records
    end

    def new
      @record = model_class_const.new
    end

    def edit
      record
    end

    # Create record
    def create
      @record = model_class_const.build record_params

      if @record.save
        redirect_to action: :index, notice: "#{model_name} was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
      if record.update(record_params)
        redirect_to action: :index, notice: "#{model_name} was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    # Delete record
    def delete
      record.destroy
      render_record message: "#{model_class_const.to_s} deleted"
    end

    def show
      record
    end

    private

    # guess the model name from the controller name
    # eg. if the controller is users_controller, modelname will be User
    def model_class_const
      controller_name.singularize.camelize.constantize
    end

    def model_name
      model_class_const.name.underscore.humanize.titleize
    end

    # create a sumbol for the model name
    def model_class_symbol
      model_class_const.to_s.underscore.to_sym
    end

    # Find record using params[:id]
    def record
      @record ||= model_class_const.find(params[:id])
    end

    # Find all records. You can also paginate them here if you like.
    def records
      @records ||= model_class_const.order(created_at: :desc, updated_at: :desc)
    end

    # Render one record
    def render_record(**opts)
      render json: {
        record: record.as_json
      }.merge(opts)
    end

    # Render array of records
    def render_records(**opts)
      records
    end

    def record_params
      permit_record_fields(params.require(model_class_symbol))
    end

    def set_model_vars
      @model_name = model_name
    end
  end

end