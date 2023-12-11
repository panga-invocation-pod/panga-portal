module FormHelper
  def form_errors(f)
    if f.object.errors.any?
      content_tag :div, class: 'alert alert-danger' do
        content_tag(:h4, "Please fix the following errors:") +
        content_tag(:ul) do
          f.object.errors.full_messages.map do |msg|
            content_tag(:li, msg)
          end.join.html_safe
        end
      end
    end
  end

  def form_actions(f)
    content_tag :div, class: 'form-actions' do
      f.submit((f.object.persisted? ? "Save" : "Create"), class: 'btn btn-primary') +
      link_to('Cancel', :back, class: 'btn btn-default')
    end
  end
end