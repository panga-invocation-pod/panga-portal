class Address
  attr_reader :name, :street, :city, :state, :postcode, :traditional_country

  def initialize(name, street, city, state, postcode, traditional_country)
    @name = name
    @street = street
    @city = city
    @state = state
    @postcode = postcode
    @traditional_country = traditional_country
  end

  def as_json
    {
      name: name,
      street: street,
      city: city,
      state: state,
      postcode: postcode,
      traditional_country: traditional_country
    }
  end
end
