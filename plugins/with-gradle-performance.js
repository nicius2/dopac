const { withGradleProperties } = require('expo/config-plugins');

const DEFAULT_ARCHITECTURES = ['arm64-v8a', 'x86_64'];

/**
 * Writes build performance settings into `android/gradle.properties` on prebuild.
 *
 * Options:
 * - `architectures`: ABIs to compile native code for. Fewer ABIs means faster builds.
 *   Add `armeabi-v7a` and `x86` for a release that must support old devices.
 * - `jvmArgs`: JVM arguments for the Gradle daemon.
 */
module.exports = function withGradlePerformance(config, options = {}) {
  const architectures = options.architectures ?? DEFAULT_ARCHITECTURES;
  const jvmArgs = options.jvmArgs ?? '-Xmx4096m -XX:MaxMetaspaceSize=1024m';

  const properties = {
    'org.gradle.jvmargs': jvmArgs,
    'org.gradle.parallel': 'true',
    'org.gradle.caching': 'true',
    'org.gradle.vfs.watch': 'true',
    reactNativeArchitectures: architectures.join(','),
  };

  return withGradleProperties(config, (config) => {
    for (const [key, value] of Object.entries(properties)) {
      const existing = config.modResults.find(
        (item) => item.type === 'property' && item.key === key,
      );
      if (existing) {
        existing.value = value;
      } else {
        config.modResults.push({ type: 'property', key, value });
      }
    }
    return config;
  });
};
