require_relative '../prompt_group'

module Messaging
  module Prompts
    class TextPrompt
      def self.from_data(data)
        raise ArgumentError unless data.is_a?(Hash)
        new(data['text'], Character.from_data(data['character']))
      end

      def initialize(text, character = nil)
        @text = text
        @character = character
      end

      attr_reader :text, :character

      def as_json(interpolator = nil, script_defaults = {})
        character = best_character(script_defaults)

        result = {
          text: interpolated_text(interpolator),
          prompt_type: 'text'
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