module Messaging
  class PromptGroup
    def initialize(prompts)
      @prompts = prompts
    end

    def as_json(interpolator = nil, script_defaults = {})
      prompts.map { |prompt| prompt.as_json(interpolator, script_defaults) }
    end

    attr_reader :prompts

    def text
      prompts.map(&:text).join("\n\n")
    end
  end
end