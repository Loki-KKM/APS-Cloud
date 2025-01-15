import { Injectable } from '@nestjs/common';
import { AuthClientTwoLegged, DerivativesApi } from 'forge-apis';

@Injectable()
export class ForgeService {
  private authClient = new AuthClientTwoLegged(
    process.env.FORGE_CLIENT_ID,
    process.env.FORGE_CLIENT_SECRET,
    ['data:read', 'data:write', 'data:create', 'viewables:read'],
  );

  async translateFile(s3Key: string): Promise<string> {
    const token = (await this.authClient.authenticate()).access_token;
    const derivativesApi = new DerivativesApi();
    const urn = Buffer.from(`s3://${process.env.S3_BUCKET_NAME}/${s3Key}`).toString('base64');

    await derivativesApi.translate(
      {
        input: { urn },
        output: { formats: [{ type: 'svf', views: ['2d', '3d'] }] },
      },
      { autoTranslate: true },
      null,
      token,
    );

    return urn;
  }
}
