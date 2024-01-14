require_relative 'prompts/text_prompt'

module Messaging
  class Prompt
    def self.from_data(data)
      return nil if data.nil?
      if data.is_a?(Array) && data.count > 1
        return PromptGroup.new(data.map { |datum| self.from_data(datum) })
      end

      input = data.is_a?(String) ? { "text" => data } : data

      type = input['type'] || 'text'
      prompt_class = "Messaging::Prompts::#{type.camelize}Prompt".constantize

      prompt_class.from_data(input)
    end
  end
end