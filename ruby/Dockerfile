ARG RUBY_VERSION=3.3
FROM ruby:$RUBY_VERSION-slim AS base

WORKDIR /rails

ENV RAILS_ENV="development"

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential libpq-dev libyaml-dev nodejs postgresql-client git libvips pkg-config && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock ./
RUN bundle install

ENTRYPOINT ["/rails/bin/docker-entrypoint"]

EXPOSE 3000

CMD ["./bin/rails", "server", "-b", "0.0.0.0", "-p", "3000"]
