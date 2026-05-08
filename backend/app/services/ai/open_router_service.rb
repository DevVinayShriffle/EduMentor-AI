# frozen_string_literal: true

module Ai
  class OpenRouterService
    include HTTParty

    base_uri "https://openrouter.ai/api/v1"

    def self.chat(messages:)
      response = post(
        "/chat/completions",
        headers: headers,
        body: body(messages: messages).to_json
      )

      parsed_response(response)
    end

    def self.headers
      {
        "Authorization" => "Bearer #{ENV['OPENROUTER_API_KEY']}",
        "Content-Type" => "application/json",
        "HTTP-Referer" => "http://localhost:3000",
        "X-Title" => "EduMentor AI"
      }
    end

    def self.body(messages:)
      {
        model: "baidu/cobuddy:free",

        messages: [
          {
            role: "system",
            content: system_prompt
          },

          *messages
        ]
      }
    end

    def self.system_prompt
      <<~PROMPT
        You are EduMentor AI Tutor.

        Your job:
        - Help students learn
        - Explain concepts simply
        - Answer educational questions
        - Be concise but clear
        - Give examples where needed
        - Never answer harmful content
      PROMPT
    end

    def self.parsed_response(response)
      body = response.parsed_response

      if response.success?
        {
          success: true,
          reply: body.dig(
            "choices", 
            0,
            "message",
            "content"
          )
        }
      else
        error_message =
          body.dig("error", "message") ||
          "Something went wrong"

        {
          success: true,
          reply: "I cannot help with harmful or violent requests."
        }
      end
    end
  end
end