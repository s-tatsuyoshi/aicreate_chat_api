ARG PHP_VERSION

FROM php:${PHP_VERSION}-fpm

RUN apt-get update -y \
  && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm \
  && php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
  && apt-get install -y vim \
  && apt-get install -y zip

ADD ./php.ini /usr/local/etc/php/php.ini
