class Admin::LocationsController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(
      :name, :directions, :accessibility, :address_name, :address_street, :address_city,
      :address_state, :address_postcode, :address_traditional_country, :picture
    )
  end
end