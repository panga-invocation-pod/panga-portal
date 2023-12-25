module Messaging
  class Character
    def self.from_data(data)
      return nil if data.nil?

      new(
        id: data['id'],
        name: data['name'],
        effect: data['effect']
      )
    end

    attr_reader :id, :name, :effect

    def initialize(id:, name:, effect:)
      @id = id
      @name = name
      @effect = effect
    end

    def as_json
      {
        id: id,
        name: name,
        effect: effect
    }.compact
    end
  end
end
