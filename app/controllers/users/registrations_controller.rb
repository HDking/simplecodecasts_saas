class Users::RegistrationsController < Devise::RegistrationsController
  #when the users submits it from either form -> check if there is a 
  #plan parameter to save
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_payment
        else
          resource.save
        end
      end
    end
end