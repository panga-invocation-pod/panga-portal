class AdminController < ApplicationController
  layout 'admin'
  before_action -> { authorize :application, :can_admin? }

end