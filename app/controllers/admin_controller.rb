class AdminController < ApplicationController
  layout 'admin'
  before_action -> { authorize :application, :can_admin? }

  private

  def storable_location?
    false
  end

end