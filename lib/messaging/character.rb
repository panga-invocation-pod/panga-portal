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

    def as_json(interpolator = nil)
      {
        id: interpolated_text(id, interpolator),
        name: interpolated_text(name, interpolator),
        effect: effect
      }.compact
    end

    private


    private

    def interpolated_text(text, interpolator = nil)
      interpolator ? interpolator.interpolate(text) : text
    end
  end
end
