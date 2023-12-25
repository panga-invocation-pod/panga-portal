require_relative 'prompt_group'

module Messaging
  class Prompt
    def self.from_data(data)
      return nil if data.nil?
      if data.is_a?(Array) && data.count > 1
        return PromptGroup.new(data.map { |datum| self.from_data(datum) })
      end

      input = data.is_a?(String) ? { "text" => data } : data

      new(input['text'], Character.from_data(input['character']))
    end

    def initialize(text, character = nil)
      @text = text
      @character = character
    end

    attr_reader :text, :character

    def as_json(interpolator = nil, script_defaults = {})
      character = best_character(script_defaults)

      result = {
        text: interpolated_text(interpolator)
      }
      result[:character] = character.as_json if character
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