module ChatHelpers
  def read(text)
    expect(page).to have_content(text)
  end
end