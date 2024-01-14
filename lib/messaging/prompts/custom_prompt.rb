require_relative '../prompt_group'

module Messaging
  module Prompts
    class CustomPrompt
      def self.from_data(data)
        raise ArgumentError unless data.is_a?(Hash)
        new(data['name'], Character.from_data(data['character']))
      end

      def initialize(name, character = nil)
        raise ArgumentError unless name.present?

        @name = name
        @character = character
      end

      attr_reader :name, :character

      def as_json(interpolator = nil, script_defaults = {})
        character = best_character(script_defaults)

        result = {
          prompt_type: 'custom',
          name: name,
        }
        result[:character] = character.as_json(interpolator) if character
        result
      end

      def best_character(script_defaults = {})
        character || script_defaults[:character]
      end

      private

      def interpolated_text(interpolator = nil)
        interpolator ? interpolator.interpolate(text) : text
      end
    end
  end
end