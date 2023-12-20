require_relative 'prompt_group'

module Messaging
  class Prompt
    def self.from_data(data)
      return nil if data.nil?
      if data.is_a?(Array) && data.count > 1
        return PromptGroup.new(data.map { |datum| self.from_data(datum) })
      end

      new(data)
    end

    def initialize(text)
      @text = text
    end

    attr_reader :text

    def as_json(interpolator = nil, script_defaults = {})
      result = {
        text: interpolated_text(interpolator)
      }
      result[:character] = script_defaults[:character].as_json if script_defaults[:character]
      result
    end

    private

    def interpolated_text(interpolator = nil)
      interpolator ? interpolator.interpolate(text) : text
    end
  end
end