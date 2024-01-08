module ChatHelpers
  def read(text)
    expect(page).to have_content(text)
  end

  def find_mail_to(email)
    ActionMailer::Base.deliveries.find { |mail| mail.to.include?(email) }
  end
end