module Messaging
  class Character
    def self.from_data(data)
      return nil if data.nil?

      new(
        id: data['id'],
        name: data['name'],
        effect: data['effect'],
        thumbnail: data['thumbnail']
      )
    end

    attr_reader :id, :name, :effect, :thumbnail

    def initialize(id:, name:, effect: nil, thumbnail: nil)
      @id = id
      @name = name
      @effect = effect
      @thumbnail = thumbnail
    end

    def as_json(interpolator = nil)
      {
        id: interpolated_text(id, interpolator),
        name: interpolated_text(name, interpolator),
        effect: effect,
        thumbnail: interpolated_text(thumbnail, interpolator)
      }.compact
    end

    private


    private

    def interpolated_text(text, interpolator = nil)
      interpolator ? interpolator.interpolate(text) : text
    end
  end
end
